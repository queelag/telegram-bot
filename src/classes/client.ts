import {
  clearInterval,
  FetchError,
  generateRandomString,
  hasObjectProperty,
  isIntervalSet,
  mergeObjects,
  omitObjectProperties,
  setInterval,
  setObjectProperty
} from '@aracna/core'
import type {
  BotCommand,
  BusinessConnection,
  BusinessMessagesDeleted,
  CallbackQuery,
  ChatBoostRemoved,
  ChatBoostUpdated,
  ChatJoinRequest,
  ChatMemberUpdated,
  ChosenInlineResult,
  GetUpdates,
  InlineQuery,
  Message,
  MessageReactionCountUpdated,
  MessageReactionUpdated,
  Poll,
  PollAnswer,
  PreCheckoutQuery,
  ShippingQuery,
  Update
} from '@aracna/telegram-bot-types'
import { DEFAULT_ALLOWED_UPDATES, DEFAULT_CLIENT_LISTENER_OPTIONS, DEFAULT_CLIENT_POLLING_MS } from '../definitions/constants'
import type {
  CallbackQueryBody,
  ClientConnectionOptions,
  ClientConnectionOptionsPolling,
  ClientDisconnectOptions,
  ClientListener,
  ClientListenerOptions,
  MessageBody
} from '../definitions/interfaces'
import type { ClientConnectionMode, ClientListenerMiddleware, UpdateType } from '../definitions/types'
import { ClassLogger } from '../loggers/class-logger'
import { deleteMessage, deleteMessages } from '../requests/delete-requests'
import { getUpdates } from '../requests/get-requests'
import { deleteWebhook, setWebhook } from '../requests/webhook-requests'
import { decodeCallbackQueryBody } from '../utils/callback-query-utils'
import { getCommand } from '../utils/command-utils'
import { decodeReplyToMessageBody } from '../utils/reply-to-message-utils'
import { decodeStartMessageBody } from '../utils/start-message-utils'

export class Client {
  protected listeners: ClientListener[]
  protected readonly id: string
  protected offset?: number
  protected token: string

  constructor(token: string) {
    this.listeners = []
    this.id = generateRandomString({ prefix: 'telegram-client' })
    this.token = token
  }

  async connect(mode: ClientConnectionMode, options?: ClientConnectionOptions): Promise<void> {
    switch (mode) {
      case 'polling':
        setInterval(() => this.poll(options?.polling), options?.polling?.ms ?? DEFAULT_CLIENT_POLLING_MS, this.id, { autorun: true })
        ClassLogger.info('Telegram', 'connect', `The client is now polling the updates.`)

        break
      case 'webhook':
        if (!options?.webhook?.url) {
          return ClassLogger.error('Telegram', 'connect', `The webhook URL is required.`, options?.webhook)
        }

        await deleteWebhook(this.token, options.webhook.delete)
        ClassLogger.verbose('Telegram', 'connect', `The webhook has been deleted.`)

        await setWebhook(this.token, options.webhook)
        ClassLogger.info('Telegram', 'connect', `The webhook has been set.`)

        break
    }
  }

  async disconnect(options?: ClientDisconnectOptions): Promise<void> {
    this.offset = undefined
    ClassLogger.verbose('Telegram', 'disconnect', `The offset has been reset.`, [this.offset])

    clearInterval(this.id)
    ClassLogger.info('Telegram', 'disconnect', `The client has been disconnected.`)

    await deleteWebhook(this.token, options?.webhook)
    ClassLogger.info('Telegram', 'disconnect', `The webhook has been deleted.`)
  }

  on<T extends UpdateType, U extends ClientListenerOptions>(type: T, middleware: ClientListenerMiddleware<T>, options?: U): void {
    let listener: ClientListener<T, U>, potential: ClientListener<T, U> | undefined

    listener = {
      command: options?.command,
      description: options?.description,
      id: generateRandomString({ blacklist: this.listenerIDs }),
      middleware: middleware,
      type: type,
      options: mergeObjects(DEFAULT_CLIENT_LISTENER_OPTIONS(), omitObjectProperties(options ?? {}, ['description', 'key']))
    }

    potential = this.findListener(listener.type, listener.command)

    if (potential) {
      potential.middleware = middleware
      ClassLogger.verbose('Telegram', 'register', `The listener has been updated.`, listener)

      return
    }

    this.listeners.push(listener)
    ClassLogger.verbose('Telegram', 'register', `The listener has been registered.`, listener)
  }

  protected handle(update: Update): void {
    let listener: ClientListener | undefined

    console.log(update)

    switch (true) {
      case hasObjectProperty(update, 'business_connection'):
        listener = this.handleBusinessConnection(update.business_connection as any)
        break
      case hasObjectProperty(update, 'business_message'):
        listener = this.handleBusinessMessage(update.business_message as any)
        break
      case hasObjectProperty(update, 'callback_query.data'):
        listener = this.handleCallbackQuery(update.callback_query as any)
        break
      case hasObjectProperty(update, 'channel_post'):
        listener = this.handleChannelPost(update.channel_post as any)
        break
      case hasObjectProperty(update, 'chat_boost'):
        listener = this.handleChatBoost(update.chat_boost as any)
        break
      case hasObjectProperty(update, 'chat_join_request'):
        listener = this.handleChatJoinRequest(update.chat_join_request as any)
        break
      case hasObjectProperty(update, 'chat_member'):
        listener = this.handleChatMember(update.chat_member as any)
        break
      case hasObjectProperty(update, 'chosen_inline_result'):
        listener = this.handleChosenInlineResult(update.chosen_inline_result as any)
        break
      case hasObjectProperty(update, 'deleted_business_messages'):
        listener = this.handleDeletedBusinessMessages(update.deleted_business_messages as any)
        break
      case hasObjectProperty(update, 'edited_business_message'):
        listener = this.handleEditedBusinessMessage(update.edited_business_message as any)
        break
      case hasObjectProperty(update, 'edited_channel_post'):
        listener = this.handleEditedChannelPost(update.edited_channel_post as any)
        break
      case hasObjectProperty(update, 'edited_message'):
        listener = this.handleEditedMessage(update.edited_message as any)
        break
      case hasObjectProperty(update, 'inline_query'):
        listener = this.handleInlineQuery(update.inline_query as any)
        break
      case hasObjectProperty(update, 'message_reaction'):
        listener = this.handleMessageReaction(update.message_reaction as any)
        break
      case hasObjectProperty(update, 'message_reaction_count'):
        listener = this.handleMessageReactionCount(update.message_reaction_count as any)
        break
      case hasObjectProperty(update, 'message') && hasObjectProperty(update, 'message.reply_to_message.text'):
        listener = this.handleReplyToMessage(update.message as any)
        break
      case hasObjectProperty(update, 'message.text'):
        if (update.message?.text?.includes('/start') && update.message?.text?.replace('/start', '').trim().length > 0) {
          listener = this.handleStart(update.message as any)
          break
        }

        listener = this.handleMessage(update.message as any)
        break
      case hasObjectProperty(update, 'my_chat_member'):
        listener = this.handleMyChatMember(update.my_chat_member as any)
        break
      case hasObjectProperty(update, 'poll'):
        listener = this.handlePoll(update.poll as any)
        break
      case hasObjectProperty(update, 'poll_answer'):
        listener = this.handlePollAnswer(update.poll_answer as any)
        break
      case hasObjectProperty(update, 'pre_checkout_query'):
        listener = this.handlePreCheckoutQuery(update.pre_checkout_query as any)
        break
      case hasObjectProperty(update, 'removed_chat_boost'):
        listener = this.handleRemovedChatBoost(update.removed_chat_boost as any)
        break
      case hasObjectProperty(update, 'shipping_query'):
        listener = this.handleShippingQuery(update.shipping_query as any)
        break
      default:
        return ClassLogger.error('Telegram', 'handle', `Failed to handle the update.`, update)
    }

    if (listener) {
      return ClassLogger.info('Telegram', 'handle', `A ${listener.type} update has been handled.`, update, listener)
    }

    ClassLogger.warn('Telegram', 'handle', `Failed to find the matching listener.`, update)
  }

  protected handleBusinessConnection(connection: BusinessConnection): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('business_connection')
    if (!listener) return

    listener.middleware(connection)

    return listener
  }

  protected handleBusinessMessage(message: Message): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('business_message')
    if (!listener) return

    listener.middleware(message)

    return listener
  }

  protected handleCallbackQuery(query: CallbackQuery): ClientListener | undefined {
    let listener: ClientListener | undefined, body: CallbackQueryBody

    body = decodeCallbackQueryBody(query.data)
    setObjectProperty(query, 'body', body)

    listener = this.findListener('callback_query', body.t)
    if (!listener) return

    listener.middleware(query)

    if (listener.options.deleteOnCallbackQuery && query.message) {
      deleteMessage(this.token, { chat_id: body.c ? query.from.id : query.message.chat.id, message_id: query.message.message_id })
    }

    return listener
  }

  protected handleChannelPost(post: Message): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('channel_post')
    if (!listener) return

    listener.middleware(post)

    return listener
  }

  protected handleChatBoost(boost: ChatBoostUpdated): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('chat_boost')
    if (!listener) return

    listener.middleware(boost)

    return listener
  }

  protected handleChatJoinRequest(request: ChatJoinRequest): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('chat_join_request')
    if (!listener) return

    listener.middleware(request)

    return listener
  }

  protected handleChatMember(member: ChatMemberUpdated): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('chat_member')
    if (!listener) return

    listener.middleware(member)

    return listener
  }

  protected handleChosenInlineResult(result: ChosenInlineResult): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('chosen_inline_result')
    if (!listener) return

    listener.middleware(result)

    return listener
  }

  protected handleDeletedBusinessMessages(deleted: BusinessMessagesDeleted): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('deleted_business_messages')
    if (!listener) return

    listener.middleware(deleted)

    return listener
  }

  protected handleEditedBusinessMessage(message: Message): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('edited_business_message')
    if (!listener) return

    listener.middleware(message)

    return listener
  }

  protected handleEditedChannelPost(post: Message): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('edited_channel_post')
    if (!listener) return

    listener.middleware(post)

    return listener
  }

  protected handleEditedMessage(message: Message): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('edited_message')
    if (!listener) return

    listener.middleware(message)

    return listener
  }

  protected handleInlineQuery(query: InlineQuery): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('inline_query')
    if (!listener) return

    listener.middleware(query)

    return listener
  }

  protected handleMessage(message: Message): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('message', getCommand(message.text))
    console.log(message, listener)
    if (!listener) return

    listener.middleware(message)

    return listener
  }

  protected handleMessageReaction(reaction: MessageReactionUpdated): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('message_reaction')
    if (!listener) return

    listener.middleware(reaction)

    return listener
  }

  protected handleMessageReactionCount(count: MessageReactionCountUpdated): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('message_reaction_count')
    if (!listener) return

    listener.middleware(count)

    return listener
  }

  protected handleMyChatMember(member: ChatMemberUpdated): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('my_chat_member')
    if (!listener) return

    listener.middleware(member)

    return listener
  }

  protected handlePoll(poll: Poll): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('poll')
    if (!listener) return

    listener.middleware(poll)

    return listener
  }

  protected handlePollAnswer(answer: PollAnswer): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('poll_answer')
    if (!listener) return

    listener.middleware(answer)

    return listener
  }

  protected handlePreCheckoutQuery(query: PreCheckoutQuery): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('pre_checkout_query')
    if (!listener) return

    listener.middleware(query)

    return listener
  }

  protected handleRemovedChatBoost(removed: ChatBoostRemoved): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('removed_chat_boost')
    if (!listener) return

    listener.middleware(removed)

    return listener
  }

  protected handleReplyToMessage(reply: Message): ClientListener | undefined {
    let body: MessageBody, listener: ClientListener | undefined

    body = decodeReplyToMessageBody(reply.reply_to_message?.entities ?? [])
    setObjectProperty(reply, 'body', body)

    listener = this.findListener('reply_to_message', body.t)
    if (!listener) return

    listener.middleware(reply)

    if (listener.id.length > 0 && listener.options.deleteOnReply && reply.from && reply.reply_to_message) {
      deleteMessages(this.token, { chat_id: reply.from.id, message_ids: [reply.message_id, reply.reply_to_message.message_id] })
    }

    return listener
  }

  protected handleShippingQuery(query: ShippingQuery): ClientListener | undefined {
    let listener: ClientListener | undefined

    listener = this.findListener('shipping_query')
    if (!listener) return

    listener.middleware(query)

    return listener
  }

  protected handleStart(start: Message): ClientListener | undefined {
    let listener: ClientListener | undefined, body: MessageBody

    body = decodeStartMessageBody(start.text)
    setObjectProperty(start, 'body', body)

    listener = this.findListener('start', body.t)
    if (!listener) return

    listener.middleware(start)

    if (listener.id.length > 0 && listener.options.deleteOnMessageStart) {
      deleteMessage(this.token, { chat_id: body.c ? start.from?.id ?? 0n : start.chat.id, message_id: start.message_id })
    }

    return listener
  }

  protected async poll(options?: ClientConnectionOptionsPolling): Promise<void> {
    let body: GetUpdates, updates: Update[] | FetchError

    body = {
      allowed_updates: options?.allowed_updates ?? DEFAULT_ALLOWED_UPDATES,
      limit: options?.limit,
      offset: options?.offset ?? this.offset,
      timeout: options?.timeout
    }

    updates = await getUpdates(this.token, body)
    if (updates instanceof Error) return

    for (let update of updates) {
      this.handle(update)
    }

    this.offset = updates.length > 0 ? updates[updates.length - 1].update_id + 1 : this.offset
    ClassLogger.verbose('Telegram', 'poll', `The offset has been set.`, [this.offset])

    if (typeof options?.offset === 'number' && typeof this.offset === 'number' && isIntervalSet(this.id)) {
      clearInterval(this.id)
      setInterval(() => this.poll({ ...options, offset: undefined }), options?.ms ?? DEFAULT_CLIENT_POLLING_MS, this.id, { autorun: true })
    }
  }

  protected findListener<T extends UpdateType, U extends ClientListenerOptions>(type: UpdateType, command?: string): ClientListener<T, U> | undefined {
    return this.listeners.find((listener: ClientListener) => listener.command === command && listener.type === type) as ClientListener<T, U>
  }

  getCommands(): BotCommand[] {
    return this.listeners
      .filter((listener: ClientListener) => typeof listener.command === 'string' && listener.type === 'message')
      .map((listener: ClientListener) => ({ command: listener.command ?? '', description: listener.description ?? '' }))
  }

  getListeners(): ClientListener[] {
    return this.listeners
  }

  getToken(): string {
    return this.token
  }

  setToken(token: string): this {
    this.token = token
    ClassLogger.verbose('Telegram', 'setToken', `The token has been set.`, [this.token])

    return this
  }

  protected get listenerIDs(): string[] {
    return this.listeners.reduce((r: string[], v: ClientListener) => [...r, v.id], [])
  }
}
