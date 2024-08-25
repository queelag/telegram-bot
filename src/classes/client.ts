import { clearInterval, FetchError, generateRandomString, hasObjectProperty, mergeObjects, parseNumber, setInterval, setObjectProperty } from '@aracna/core'
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
import { DEFAULT_HANDLER_OPTIONS } from '../definitions/constants'
import type { CallbackQueryBody, ClientConnectionOptions, Handler, HandlerOptions, MessageBody } from '../definitions/interfaces'
import type { ClientConnectionMode, HandlerMiddleware, UpdateType } from '../definitions/types'
import { ClassLogger } from '../loggers/class-logger'
import { deleteMessage } from '../requests/delete-requests'
import { getUpdates } from '../requests/get-requests'
import { deleteWebhook, setWebhook } from '../requests/webhook-requests'
import { decodeCallbackQueryBody } from '../utils/callback-query-utils'
import { getCommand } from '../utils/command-utils'
import { decodeReplyToMessageBody } from '../utils/reply-to-message-utils'
import { decodeStartMessageBody } from '../utils/start-message-utils'
import { getWebhookURL } from '../utils/webhook-utils'

export class Client {
  handlers: Handler[]
  host: string
  protected id: string
  protected offset?: number
  port: number
  token: string

  constructor(token: string, host: string = '', port: number = parseNumber(process.env.PORT)) {
    this.handlers = []
    this.host = host
    this.id = generateRandomString()
    this.port = port
    this.token = token
  }

  async connect(mode: ClientConnectionMode, options?: ClientConnectionOptions): Promise<void> {
    switch (mode) {
      case 'polling':
        setInterval(this.poll.bind(this), options?.polling?.ms ?? 1000, this.id, { autorun: true })
        ClassLogger.info('Telegram', 'connect', `The client is now polling the updates.`)

        break
      case 'webhook':
        await deleteWebhook(this.token)
        ClassLogger.verbose('Telegram', 'connect', `The webhook has been deleted.`)

        await setWebhook(this.token, { url: getWebhookURL(this.host, this.token, this.port) })
        ClassLogger.info('Telegram', 'connect', `The webhook has been set.`)

        break
    }
  }

  async disconnect(): Promise<void> {
    clearInterval(this.id)
    ClassLogger.info('Telegram', 'disconnect', `The client has been disconnected.`)

    await deleteWebhook(this.token)
    ClassLogger.info('Telegram', 'disconnect', `The webhook has been deleted.`)
  }

  on<T extends UpdateType, U extends HandlerOptions>(type: T, middleware: HandlerMiddleware<T>, key?: string, description?: string, options?: U): void {
    let handler: Handler<T, U>, potential: Handler<T, U> | undefined

    handler = {
      description: description,
      id: generateRandomString({ blacklist: this.handlerIDs }),
      key: key,
      middleware: middleware,
      type: type,
      options: mergeObjects(DEFAULT_HANDLER_OPTIONS, options ?? {})
    }

    potential = this.findMatchingHandler(handler.type, handler.key)

    if (potential) {
      potential.middleware = middleware
      ClassLogger.verbose('Telegram', 'register', `The handler has been updated.`, handler)

      return
    }

    this.handlers.push(handler)
    ClassLogger.verbose('Telegram', 'register', `The handler has been registered.`, handler)
  }

  protected handle(update: Update): void {
    let handler: Handler | undefined

    switch (true) {
      case hasObjectProperty(update, 'business_connection'):
        handler = this.handleBusinessConnection(update.business_connection as any)
        break
      case hasObjectProperty(update, 'business_message'):
        handler = this.handleBusinessMessage(update.business_message as any)
        break
      case hasObjectProperty(update, 'callback_query.data'):
        handler = this.handleCallbackQuery(update.callback_query as any)
        break
      case hasObjectProperty(update, 'channel_post'):
        handler = this.handleChannelPost(update.channel_post as any)
        break
      case hasObjectProperty(update, 'chat_boost'):
        handler = this.handleChatBoost(update.chat_boost as any)
        break
      case hasObjectProperty(update, 'chat_join_request'):
        handler = this.handleChatJoinRequest(update.chat_join_request as any)
        break
      case hasObjectProperty(update, 'chat_member'):
        handler = this.handleChatMember(update.chat_member as any)
        break
      case hasObjectProperty(update, 'chosen_inline_result'):
        handler = this.handleChosenInlineResult(update.chosen_inline_result as any)
        break
      case hasObjectProperty(update, 'deleted_business_messages'):
        handler = this.handleDeletedBusinessMessages(update.deleted_business_messages as any)
        break
      case hasObjectProperty(update, 'edited_business_message'):
        handler = this.handleEditedBusinessMessage(update.edited_business_message as any)
        break
      case hasObjectProperty(update, 'edited_channel_post'):
        handler = this.handleEditedChannelPost(update.edited_channel_post as any)
        break
      case hasObjectProperty(update, 'edited_message'):
        handler = this.handleEditedMessage(update.edited_message as any)
        break
      case hasObjectProperty(update, 'inline_query'):
        handler = this.handleInlineQuery(update.inline_query as any)
        break
      case hasObjectProperty(update, 'message_reaction'):
        handler = this.handleMessageReaction(update.message_reaction as any)
        break
      case hasObjectProperty(update, 'message_reaction_count'):
        handler = this.handleMessageReactionCount(update.message_reaction_count as any)
        break
      case hasObjectProperty(update, 'message') && hasObjectProperty(update, 'message.reply_to_message.text'):
        handler = this.handleReplyToMessage(update.message as any)
        break
      case hasObjectProperty(update, 'message.text'):
        if (update.message?.text?.includes('/start') && update.message?.text?.replace('/start', '').trim().length > 0) {
          handler = this.handleStart(update.message as any)
          break
        }

        handler = this.handleMessage(update.message as any)
        break
      case hasObjectProperty(update, 'message.document') && hasObjectProperty(update, 'message.caption'):
        handler = this.handleDocument(update.message as any)
        break
      case hasObjectProperty(update, 'my_chat_member'):
        handler = this.handleMyChatMember(update.my_chat_member as any)
        break
      case hasObjectProperty(update, 'poll'):
        handler = this.handlePoll(update.poll as any)
        break
      case hasObjectProperty(update, 'poll_answer'):
        handler = this.handlePollAnswer(update.poll_answer as any)
        break
      case hasObjectProperty(update, 'pre_checkout_query'):
        handler = this.handlePreCheckoutQuery(update.pre_checkout_query as any)
        break
      case hasObjectProperty(update, 'removed_chat_boost'):
        handler = this.handleRemovedChatBoost(update.removed_chat_boost as any)
        break
      case hasObjectProperty(update, 'shipping_query'):
        handler = this.handleShippingQuery(update.shipping_query as any)
        break
      default:
        return ClassLogger.error('Telegram', 'handle', `Failed to handle the update.`, update)
    }

    if (handler) {
      return ClassLogger.info('Telegram', 'handle', `A ${handler.type} update has been handled.`, update, handler)
    }

    ClassLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)
  }

  protected handleBusinessConnection(connection: BusinessConnection): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('business_connection')
    if (!handler) return

    handler.middleware(connection)

    return handler
  }

  protected handleBusinessMessage(message: Message): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('business_message')
    if (!handler) return

    handler.middleware(message)

    return handler
  }

  protected handleCallbackQuery(query: CallbackQuery): Handler | undefined {
    let handler: Handler | undefined, body: CallbackQueryBody

    body = decodeCallbackQueryBody(query.data)
    setObjectProperty(query, 'body', body)

    handler = this.findMatchingHandler('callback_query', body.t)
    if (!handler) return

    handler.middleware(query)

    if (handler.options.deleteOnCallbackQuery && query.message) {
      deleteMessage(this.token, { chat_id: body.c ? query.from.id : query.message.chat.id, message_id: query.message.message_id })
    }

    return handler
  }

  protected handleChannelPost(post: Message): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('channel_post')
    if (!handler) return

    handler.middleware(post)

    return handler
  }

  protected handleChatBoost(boost: ChatBoostUpdated): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('chat_boost')
    if (!handler) return

    handler.middleware(boost)

    return handler
  }

  protected handleChatJoinRequest(request: ChatJoinRequest): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('chat_join_request')
    if (!handler) return

    handler.middleware(request)

    return handler
  }

  protected handleChatMember(member: ChatMemberUpdated): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('chat_member')
    if (!handler) return

    handler.middleware(member)

    return handler
  }

  protected handleChosenInlineResult(result: ChosenInlineResult): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('chosen_inline_result')
    if (!handler) return

    handler.middleware(result)

    return handler
  }

  protected handleDeletedBusinessMessages(deleted: BusinessMessagesDeleted): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('deleted_business_messages')
    if (!handler) return

    handler.middleware(deleted)

    return handler
  }

  protected handleDocument(document: Message): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('document', getCommand(document.caption))
    if (!handler) return

    handler.middleware(document)

    return handler
  }

  protected handleEditedBusinessMessage(message: Message): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('edited_business_message')
    if (!handler) return

    handler.middleware(message)

    return handler
  }

  protected handleEditedChannelPost(post: Message): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('edited_channel_post')
    if (!handler) return

    handler.middleware(post)

    return handler
  }

  protected handleEditedMessage(message: Message): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('edited_message')
    if (!handler) return

    handler.middleware(message)

    return handler
  }

  protected handleInlineQuery(query: InlineQuery): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('inline_query')
    if (!handler) return

    handler.middleware(query)

    return handler
  }

  protected handleMessage(message: Message): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('message', getCommand(message.text))
    if (!handler) return

    handler.middleware(message)

    return handler
  }

  protected handleMessageReaction(reaction: MessageReactionUpdated): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('message_reaction')
    if (!handler) return

    handler.middleware(reaction)

    return handler
  }

  protected handleMessageReactionCount(count: MessageReactionCountUpdated): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('message_reaction_count')
    if (!handler) return

    handler.middleware(count)

    return handler
  }

  protected handleMyChatMember(member: ChatMemberUpdated): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('my_chat_member')
    if (!handler) return

    handler.middleware(member)

    return handler
  }

  protected handlePoll(poll: Poll): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('poll')
    if (!handler) return

    handler.middleware(poll)

    return handler
  }

  protected handlePollAnswer(answer: PollAnswer): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('poll_answer')
    if (!handler) return

    handler.middleware(answer)

    return handler
  }

  protected handlePreCheckoutQuery(query: PreCheckoutQuery): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('pre_checkout_query')
    if (!handler) return

    handler.middleware(query)

    return handler
  }

  protected handleRemovedChatBoost(removed: ChatBoostRemoved): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('removed_chat_boost')
    if (!handler) return

    handler.middleware(removed)

    return handler
  }

  protected handleReplyToMessage(reply: Message): Handler | undefined {
    let body: MessageBody, handler: Handler | undefined

    body = decodeReplyToMessageBody(reply.reply_to_message?.entities ?? [])
    setObjectProperty(reply, 'body', body)

    handler = this.findMatchingHandler('reply_to_message', body.type)
    if (!handler) return

    handler.middleware(reply)

    if (handler.id.length > 0 && handler.options.deleteOnReply && reply.from && reply.reply_to_message) {
      deleteMessage(this.token, { chat_id: reply.from.id, message_id: reply.message_id })
      deleteMessage(this.token, { chat_id: reply.from.id, message_id: reply.reply_to_message.message_id })
    }

    return handler
  }

  protected handleShippingQuery(query: ShippingQuery): Handler | undefined {
    let handler: Handler | undefined

    handler = this.findMatchingHandler('shipping_query')
    if (!handler) return

    handler.middleware(query)

    return handler
  }

  protected handleStart(start: Message): Handler | undefined {
    let handler: Handler | undefined, body: MessageBody

    body = decodeStartMessageBody(start.text)
    setObjectProperty(start, 'body', body)

    handler = this.findMatchingHandler('start', body.type)
    if (!handler) return

    handler.middleware(start)

    if (handler.id.length > 0 && handler.options.deleteOnMessageStart) {
      deleteMessage(this.token, { chat_id: body.chatID ? start.from?.id ?? 0n : start.chat.id, message_id: start.message_id })
    }

    return handler
  }

  protected async poll(): Promise<void> {
    let body: GetUpdates, updates: Update[] | FetchError

    body = {
      allowed_updates: [
        'business_connection',
        'business_message',
        'callback_query',
        'channel_post',
        'chat_boost',
        'chat_join_request',
        'chat_member',
        'chosen_inline_result',
        'deleted_business_messages',
        'document',
        'edited_business_message',
        'edited_channel_post',
        'edited_message',
        'inline_query',
        'message',
        'message_reaction',
        'message_reaction_count',
        'my_chat_member',
        'poll',
        'poll_answer',
        'pre_checkout_query',
        'removed_chat_boost',
        'reply_to_message',
        'shipping_query',
        'start'
      ],
      offset: this.offset
    }

    updates = await getUpdates(this.token, body)
    if (updates instanceof Error) return

    for (let update of updates) {
      this.handle(update)
    }

    this.offset = updates.length > 0 ? updates[updates.length - 1].update_id + 1 : this.offset
    ClassLogger.verbose('Telegram', 'poll', `The offset has been set.`, [this.offset])
  }

  protected findMatchingHandler<T extends UpdateType, U extends HandlerOptions>(type: UpdateType, key?: string): Handler<T, U> | undefined {
    return this.handlers.find((v: Handler) => v.key === key && v.type === type) as Handler<T, U>
  }

  get commands(): BotCommand[] {
    return this.handlers.filter((v: Handler) => v.key && v.type === 'message').map((v: Handler) => ({ command: v.key ?? '', description: v.description ?? '' }))
  }

  protected get handlerIDs(): string[] {
    return this.handlers.reduce((r: string[], v: Handler) => [...r, v.id], [])
  }
}
