import { IDUtils, NumberUtils, ObjectUtils } from '@queelag/core'
import { BotCommand, Update } from '@queelag/telegram-types'
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
import { Handler, HandlerOptions } from '../definitions/interfaces'
import { HandlerMiddleware } from '../definitions/types'
import { ModuleLogger } from '../loggers/module.logger'
import { API } from './api'
import { Builder } from './builder'
import { Dummy } from './dummy'
import { Utils } from './utils'

export class Telegram {
  api: API
  hostname: string
  port: number
  token: string

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

  builder: Builder
  utils: Utils

  private handlers: Handler[]

  constructor(token: string, hostname: string = '', port: number = NumberUtils.parseInt(process.env.PORT)) {
    this.api = new API('https://api.telegram.org/bot' + token + '/')
    this.hostname = hostname
    this.port = port
    this.token = token

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

    this.builder = new Builder()
    this.utils = new Utils()

    this.handlers = []
  }

  on<T extends UpdateType, U extends HandlerOptions>(type: T, middleware: HandlerMiddleware<T>, key: string = '', options?: U): void {
    let handler: Handler<T, U>, potential: Handler<T, U>

    handler = Dummy.handler
    handler.id = IDUtils.unique(this.handlerIds)
    handler.key = key
    handler.middleware = middleware
    handler.type = type
    handler.options = ObjectUtils.merge(handler.options, options)

    potential = this.findMatchingHandler(handler.type, handler.key)
    potential.id ? (potential.middleware = middleware) : this.handlers.push(handler)

    ModuleLogger.debug('Telegram', 'register', `The handler has been registered.`, handler)
  }

  handle(update: Update): void {
    let handler: Handler

    switch (true) {
      case ObjectUtils.has(update, 'callback_query') && ObjectUtils.has(update, 'callback_query.data'):
        update.callback_query.message.chat.id = this.utils.findCallbackQueryChatId(update.callback_query)

        handler = this.findMatchingHandler(UpdateType.CALLBACK_QUERY, this.utils.findCommandByContext(update.callback_query))
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.callback_query)

        if (handler.options.deleteOnCallbackQuery) {
          this.delete.message(
            update.callback_query.data.includes('c:') ? update.callback_query.from.id : update.callback_query.message.chat.id,
            update.callback_query.message.message_id
          )
        }

        break
      case ObjectUtils.has(update, 'channel_post'):
        handler = this.findMatchingHandler(UpdateType.CHANNEL_POST)
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.channel_post)

        break
      case ObjectUtils.has(update, 'chat_join_request'):
        handler = this.findMatchingHandler(UpdateType.CHAT_JOIN_REQUEST)
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.chat_join_request)

        break
      case ObjectUtils.has(update, 'chat_member'):
        handler = this.findMatchingHandler(UpdateType.CHAT_MEMBER)
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.chat_member)

        break
      case ObjectUtils.has(update, 'chosen_inline_result'):
        handler = this.findMatchingHandler(UpdateType.CHOSEN_INLINE_RESULT)
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.chosen_inline_result)

        break
      case ObjectUtils.has(update, 'edited_channel_post'):
        handler = this.findMatchingHandler(UpdateType.EDITED_CHANNEL_POST)
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.edited_channel_post)

        break
      case ObjectUtils.has(update, 'edited_message'):
        handler = this.findMatchingHandler(UpdateType.EDITED_MESSAGE)
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.edited_message)

        break
      case ObjectUtils.has(update, 'inline_query'):
        handler = this.findMatchingHandler(UpdateType.INLINE_QUERY)
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.inline_query)

        break
      case ObjectUtils.has(update, 'message') && ObjectUtils.has(update, 'message.reply_to_message.text'):
        update.message.chat.id = this.utils.findReplyToMessageChatId(update.message)

        handler = this.findMatchingHandler(UpdateType.REPLY_TO_MESSAGE, this.utils.findCommandByContext(update.message))
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.message)

        if (handler.id.length > 0 && handler.options.deleteOnReply) {
          this.delete.message(update.message.from.id, update.message.message_id)
          this.delete.message(update.message.from.id, update.message.reply_to_message.message_id)
        }

        break
      case ObjectUtils.has(update, 'message') && ObjectUtils.has(update, 'message.text'):
        handler = this.findMatchingHandler(UpdateType.MESSAGE, this.utils.findCommandByContext(update.message))
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.message)

        break
      case ObjectUtils.has(update, 'message') && ObjectUtils.has(update, 'message.document') && ObjectUtils.has(update, 'message.caption'):
        handler = this.findMatchingHandler(UpdateType.DOCUMENT, this.utils.findCommandByContext(update.message))
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.message)

        break
      case ObjectUtils.has(update, 'my_chat_member'):
        handler = this.findMatchingHandler(UpdateType.MY_CHAT_MEMBER)
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.my_chat_member)

        break
      case ObjectUtils.has(update, 'poll'):
        handler = this.findMatchingHandler(UpdateType.POLL)
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.poll)

        break
      case ObjectUtils.has(update, 'poll_answer'):
        handler = this.findMatchingHandler(UpdateType.POLL_ANSWER)
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.poll_answer)

        break
      case ObjectUtils.has(update, 'pre_checkout_query'):
        handler = this.findMatchingHandler(UpdateType.PRE_CHECKOUT_QUERY)
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.pre_checkout_query)

        break
      case ObjectUtils.has(update, 'shipping_query'):
        handler = this.findMatchingHandler(UpdateType.SHIPPING_QUERY)
        if (!handler.id) return ModuleLogger.warn('Telegram', 'handle', `Failed to find the matching handler.`, update)

        handler.middleware(update.shipping_query)

        break
      default:
        ModuleLogger.error('Telegram', 'handle', `Failed to handle the update.`, update)
        return
    }

    ModuleLogger.debug('Telegram', 'handle', `A ${handler.type} update has been handled.`, update, handler)
  }

  private findMatchingHandler<T extends UpdateType, U extends HandlerOptions>(type: UpdateType, key: string = ''): Handler<T, U> {
    return this.handlers.find((v: Handler) => v.key === key && v.type === type) || Dummy.handler
  }

  get commands(): BotCommand[] {
    return this.handlers
      .filter((v: Handler) => v.type === UpdateType.MESSAGE)
      .reduce((r: BotCommand[], v: Handler) => [...r, { command: v.key, description: v.options.description }], [])
  }

  private get handlerIds(): string[] {
    return this.handlers.reduce((r: string[], v: Handler) => [...r, v.id], [])
  }
}
