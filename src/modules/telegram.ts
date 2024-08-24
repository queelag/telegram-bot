import { generateRandomString, getObjectProperty, hasObjectProperty, mergeObjects, parseNumber, setObjectProperty } from '@aracna/core'
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
import { UpdateType } from '../definitions/enums'
import type { CallbackQueryBody, Handler, HandlerOptions, MessageBody } from '../definitions/interfaces'
import type { HandlerMiddleware } from '../definitions/types'
import { ModuleLogger } from '../loggers/module.logger'
import { decodeCallbackQueryBody } from '../utils/callback-query-utils'
import { getCommand } from '../utils/command-utils'
import { decodeReplyToMessageBody } from '../utils/reply-to-message-utils'
import { decodeStartMessageBody } from '../utils/start-message-utils'

export class Telegram {
  handlers: Handler[]
  hostname: string
  port: number
  token: string

  constructor(token: string, hostname: string = '', port: number = parseNumber(process.env.PORT)) {
    this.handlers = []
    this.hostname = hostname
    this.port = port
    this.token = token
  }

  on<T extends UpdateType, U extends HandlerOptions>(type: T, middleware: HandlerMiddleware<T>, key?: string, description?: string, options?: U): void {
    let handler: Handler<T, U>, potential: Handler<T, U>

    handler = {
      description: description,
      id: generateRandomString({ blacklist: this.handlerIDs }),
      key: key,
      middleware: middleware,
      type: type,
      options: mergeObjects(DEFAULT_HANDLER_OPTIONS, options ?? {})
    }

    potential = this.findMatchingHandler(handler.type, handler.key)

    if (potential.id) {
      potential.middleware = middleware
      ModuleLogger.debug('Telegram', 'register', `The handler has been updated.`, handler)

      return
    }

    this.handlers.push(handler)
    ModuleLogger.debug('Telegram', 'register', `The handler has been registered.`, handler)
  }

  handle(update: Update): void {
    let handler: Handler

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
      case getObjectProperty(update, 'message.text', '').includes('/start') &&
        getObjectProperty(update, 'message.text', '').replace('/start', '').trim().length > 0:
        handler = this.handleStart(update.message as any)
        break
      case hasObjectProperty(update, 'message') && hasObjectProperty(update, 'message.reply_to_message.text'):
        handler = this.handleReplyToMessage(update.message as any)
        break
      case hasObjectProperty(update, 'message.text'):
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
        ModuleLogger.error('Telegram', 'handle', `Failed to handle the update.`, update)
        return
    }

    handler.id
      ? ModuleLogger.debug('Telegram', 'handle', `A ${handler.type} update has been handled.`, update, handler)
      : ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)
  }

  handleBusinessConnection(connection: BusinessConnection): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.BUSINESS_CONNECTION)
    if (!handler.id) return handler

    handler.middleware(connection)

    return handler
  }

  handleBusinessMessage(message: Message): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.BUSINESS_MESSAGE)
    if (!handler.id) return handler

    handler.middleware(message)

    return handler
  }

  handleCallbackQuery(query: CallbackQuery): Handler {
    let handler: Handler, body: CallbackQueryBody

    body = decodeCallbackQueryBody(query.data)
    setObjectProperty(query, 'body', body)

    handler = this.findMatchingHandler(UpdateType.CALLBACK_QUERY, body.t)
    if (!handler.id) return handler

    handler.middleware(query)

    if (handler.options.deleteOnCallbackQuery && query.message) {
      this.delete.message(body.c ? query.from.id : query.message.chat.id, query.message.message_id)
    }

    return handler
  }

  handleChannelPost(post: Message): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.CHANNEL_POST)
    if (!handler.id) return handler

    handler.middleware(post)

    return handler
  }

  handleChatBoost(boost: ChatBoostUpdated): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.CHAT_BOOST)
    if (!handler.id) return handler

    handler.middleware(boost)

    return handler
  }

  handleChatJoinRequest(request: ChatJoinRequest): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.CHAT_JOIN_REQUEST)
    if (!handler.id) return handler

    handler.middleware(request)

    return handler
  }

  handleChatMember(member: ChatMemberUpdated): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.CHAT_MEMBER)
    if (!handler.id) return handler

    handler.middleware(member)

    return handler
  }

  handleChosenInlineResult(result: ChosenInlineResult): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.CHOSEN_INLINE_RESULT)
    if (!handler.id) return handler

    handler.middleware(result)

    return handler
  }

  handleDeletedBusinessMessages(deleted: BusinessMessagesDeleted): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.DELETED_BUSINESS_MESSAGES)
    if (!handler.id) return handler

    handler.middleware(deleted)

    return handler
  }

  handleDocument(document: Message): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.DOCUMENT, getCommand(document.caption))
    if (!handler.id) return handler

    handler.middleware(document)

    return handler
  }

  handleEditedChannelPost(post: Message): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.EDITED_CHANNEL_POST)
    if (!handler.id) return handler

    handler.middleware(post)

    return handler
  }

  handleEditedBusinessMessage(message: Message): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.EDITED_BUSINESS_MESSAGE)
    if (!handler.id) return handler

    handler.middleware(message)

    return handler
  }

  handleEditedMessage(message: Message): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.EDITED_MESSAGE)
    if (!handler.id) return handler

    handler.middleware(message)

    return handler
  }

  handleInlineQuery(query: InlineQuery): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.INLINE_QUERY)
    if (!handler.id) return handler

    handler.middleware(query)

    return handler
  }

  handleMessage(message: Message): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.MESSAGE, getCommand(message.text))
    if (!handler.id) return handler

    handler.middleware(message)

    return handler
  }

  handleMessageReaction(reaction: MessageReactionUpdated): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.MESSAGE_REACTION)
    if (!handler.id) return handler

    handler.middleware(reaction)

    return handler
  }

  handleMessageReactionCount(count: MessageReactionCountUpdated): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.MESSAGE_REACTION_COUNT)
    if (!handler.id) return handler

    handler.middleware(count)

    return handler
  }

  handleMyChatMember(member: ChatMemberUpdated): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.MY_CHAT_MEMBER)
    if (!handler.id) return handler

    handler.middleware(member)

    return handler
  }

  handlePoll(poll: Poll): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.POLL)
    if (!handler.id) return handler

    handler.middleware(poll)

    return handler
  }

  handlePollAnswer(answer: PollAnswer): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.POLL_ANSWER)
    if (!handler.id) return handler

    handler.middleware(answer)

    return handler
  }

  handlePreCheckoutQuery(query: PreCheckoutQuery): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.PRE_CHECKOUT_QUERY)
    if (!handler.id) return handler

    handler.middleware(query)

    return handler
  }

  handleRemovedChatBoost(removed: ChatBoostRemoved): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.REMOVED_CHAT_BOOST)
    if (!handler.id) return handler

    handler.middleware(removed)

    return handler
  }

  handleReplyToMessage(reply: Message): Handler {
    let body: MessageBody, handler: Handler

    body = decodeReplyToMessageBody(reply.reply_to_message?.entities ?? [])
    setObjectProperty(reply, 'body', body)

    handler = this.findMatchingHandler(UpdateType.REPLY_TO_MESSAGE, body.type)
    if (!handler.id) return handler

    handler.middleware(reply)

    if (handler.id.length > 0 && handler.options.deleteOnReply && reply.from && reply.reply_to_message) {
      this.delete.message(reply.from.id, reply.message_id)
      this.delete.message(reply.from.id, reply.reply_to_message.message_id)
    }

    return handler
  }

  handleShippingQuery(query: ShippingQuery): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.SHIPPING_QUERY)
    if (!handler.id) return handler

    handler.middleware(query)

    return handler
  }

  handleStart(start: Message): Handler {
    let handler: Handler, body: MessageBody

    body = decodeStartMessageBody(start.text)
    setObjectProperty(start, 'body', body)

    handler = this.findMatchingHandler(UpdateType.START, body.type)
    if (!handler.id) return handler

    handler.middleware(start)

    if (handler.id.length > 0 && handler.options.deleteOnMessageStart) {
      this.delete.message(body.chatID ? start.from?.id ?? 0n : start.chat.id, start.message_id)
    }

    return handler
  }

  private findMatchingHandler<T extends UpdateType, U extends HandlerOptions>(type: UpdateType, key: string = ''): Handler<T, U> {
    return this.handlers.find((v: Handler) => v.key === key && v.type === type) ?? Dummy.handler
  }

  get commands(): BotCommand[] {
    return this.handlers
      .filter((v: Handler) => v.key && v.type === UpdateType.MESSAGE)
      .map((v: Handler) => ({ command: v.key ?? '', description: v.description ?? '' }))
  }

  private get handlerIDs(): string[] {
    return this.handlers.reduce((r: string[], v: Handler) => [...r, v.id], [])
  }
}
