import { FetchError, generateRandomString, getObjectProperty, hasObjectProperty, mergeObjects, parseNumber, setObjectProperty } from '@aracna/core'
import {
  BotCommand,
  CallbackQuery,
  ChatJoinRequest,
  ChatMemberUpdated,
  ChosenInlineResult,
  InlineQuery,
  Message,
  Poll,
  PollAnswer,
  PreCheckoutQuery,
  ShippingQuery,
  Update,
  User
} from '@aracna/telegram-bot-types'
import { Add } from '../childs/add'
import { Answer } from '../childs/answer'
import { Ban } from '../childs/ban'
import { Create } from '../childs/create'
import { Delete } from '../childs/delete'
import { Download } from '../childs/download'
import { Edit } from '../childs/edit'
import { Export } from '../childs/export'
import { Forward } from '../childs/forward'
import { Get } from '../childs/get'
import { Leave } from '../childs/leave'
import { Pin } from '../childs/pin'
import { Polling } from '../childs/polling'
import { Promote } from '../childs/promote'
import { Restrict } from '../childs/restrict'
import { Send } from '../childs/send'
import { Set } from '../childs/set'
import { Stop } from '../childs/stop'
import { Unban } from '../childs/unban'
import { Unpin } from '../childs/unpin'
import { Upload } from '../childs/upload'
import { Webhook } from '../childs/webhook'
import { UpdateType } from '../definitions/enums'
import { CallbackQueryBody, Handler, HandlerOptions, MessageBody, TelegramName } from '../definitions/interfaces'
import { HandlerMiddleware } from '../definitions/types'
import { ModuleLogger } from '../loggers/module.logger'
import { CallbackQueryUtils } from '../utils/callback.query.utils'
import { CommandUtils } from '../utils/command.utils'
import { ReplyToMessageUtils } from '../utils/reply.to.message.utils'
import { StartUtils } from '../utils/start.utils'
import { API } from './api'
import { Builder } from './builder'
import { Dummy } from './dummy'

export class Telegram {
  /** INTERNAL */
  api: API
  handlers: Handler[]
  hostname: string
  id: number
  name: TelegramName
  port: number
  token: string
  username: string

  /** BUILDERS */
  builder: Builder

  /** CHILDS */
  add: Add
  answer: Answer
  create: Create
  delete: Delete
  download: Download
  edit: Edit
  export: Export
  forward: Forward
  get: Get
  ban: Ban
  leave: Leave
  pin: Pin
  polling: Polling
  promote: Promote
  restrict: Restrict
  send: Send
  set: Set
  stop: Stop
  unban: Unban
  unpin: Unpin
  upload: Upload
  webhook: Webhook

  constructor(token: string, hostname: string = '', port: number = parseNumber(process.env.PORT)) {
    this.api = new API('https://api.telegram.org/bot' + token + '/')
    this.handlers = []
    this.hostname = hostname
    this.name = { first: '', last: '' }
    this.id = 0
    this.port = port
    this.token = token
    this.username = ''

    this.builder = new Builder()

    this.add = new Add(this)
    this.answer = new Answer(this)
    this.create = new Create(this)
    this.delete = new Delete(this)
    this.download = new Download(this)
    this.edit = new Edit(this)
    this.export = new Export(this)
    this.forward = new Forward(this)
    this.get = new Get(this)
    this.ban = new Ban(this)
    this.leave = new Leave(this)
    this.pin = new Pin(this)
    this.polling = new Polling(this)
    this.promote = new Promote(this)
    this.restrict = new Restrict(this)
    this.send = new Send(this)
    this.set = new Set(this)
    this.stop = new Stop(this)
    this.unban = new Unban(this)
    this.unpin = new Unpin(this)
    this.upload = new Upload(this)
    this.webhook = new Webhook(this)

    this.get.me().then((v: User | FetchError) => {
      if (v instanceof Error) return

      this.id = v.id
      this.name.first = v.first_name
      this.name.last = v.last_name || ''
      this.username = v.username || ''
    })
  }

  on<T extends UpdateType, U extends HandlerOptions>(type: T, middleware: HandlerMiddleware<T>, key?: string, description?: string, options?: U): void {
    let handler: Handler<T, U>, potential: Handler<T, U>

    handler = Dummy.handler
    handler.description = description
    handler.id = generateRandomString({ blacklist: this.handlerIDs })
    handler.key = key
    handler.middleware = middleware
    handler.type = type
    handler.options = mergeObjects(handler.options, options || {})

    potential = this.findMatchingHandler(handler.type, handler.key)
    potential.id ? (potential.middleware = middleware) : this.handlers.push(handler)

    ModuleLogger.debug('Telegram', 'register', `The handler has been registered.`, handler)
  }

  handle(update: Update): void {
    let handler: Handler

    switch (true) {
      case hasObjectProperty(update, 'callback_query.data'):
        handler = this.handleCallbackQuery(update.callback_query as any)
        break
      case hasObjectProperty(update, 'channel_post'):
        handler = this.handleChannelPost(update.channel_post as any)
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
      case hasObjectProperty(update, 'edited_channel_post'):
        handler = this.handleEditedChannelPost(update.edited_channel_post as any)
        break
      case hasObjectProperty(update, 'edited_message'):
        handler = this.handleEditedMessage(update.edited_message as any)
        break
      case hasObjectProperty(update, 'inline_query'):
        handler = this.handleInlineQuery(update.inline_query as any)
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

  handleCallbackQuery(query: CallbackQuery): Handler {
    let handler: Handler, body: CallbackQueryBody

    body = CallbackQueryUtils.decodeBody(query.data)
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
    ModuleLogger.debug('Telegram', 'handleChannelPost', `A ${handler.type} update has been handled.`, post, handler)

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

  handleDocument(document: Message): Handler {
    let handler: Handler

    handler = this.findMatchingHandler(UpdateType.DOCUMENT, CommandUtils.get(document.caption))
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

    handler = this.findMatchingHandler(UpdateType.MESSAGE, CommandUtils.get(message.text))
    if (!handler.id) return handler

    handler.middleware(message)

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

  handleReplyToMessage(reply: Message): Handler {
    let body: MessageBody, handler: Handler

    body = ReplyToMessageUtils.decodeBody(reply.reply_to_message?.entities || [])
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

    body = StartUtils.decodeBody(start.text)
    setObjectProperty(start, 'body', body)

    handler = this.findMatchingHandler(UpdateType.START, body.type)
    if (!handler.id) return handler

    handler.middleware(start)

    if (handler.id.length > 0 && handler.options.deleteOnMessageStart) {
      this.delete.message(body.chatID ? start.from?.id || 0 : start.chat.id, start.message_id)
    }

    return handler
  }

  private findMatchingHandler<T extends UpdateType, U extends HandlerOptions>(type: UpdateType, key: string = ''): Handler<T, U> {
    return this.handlers.find((v: Handler) => v.key === key && v.type === type) || Dummy.handler
  }

  get commands(): BotCommand[] {
    return this.handlers
      .filter((v: Handler) => v.key && v.type === UpdateType.MESSAGE)
      .map((v: Handler) => ({ command: v.key || '', description: v.description || '' }))
  }

  private get handlerIDs(): string[] {
    return this.handlers.reduce((r: string[], v: Handler) => [...r, v.id], [])
  }
}
