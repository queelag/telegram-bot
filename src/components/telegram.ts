import { Handler, HandlerMiddleware, HandlerOptions } from '../definitions/types'
import { HandlerType } from '../definitions/enums'
import Dummy from '../modules/dummy'
import API from '../modules/api'
import { Update, Message, CallbackQuery, BotCommand } from '@queelag/telegram-types'
import { has } from 'lodash'
import ID from '../modules/id'
import Webhook from '../childs/webhook'
import Send from '../childs/send'
import Polling from '../childs/polling'
import Get from '../childs/get'
import Edit from '../childs/edit'
import Delete from '../childs/delete'
import Add from '../childs/add'
import Answer from '../childs/answer'
import Create from '../childs/create'
import Export from '../childs/export'
import Forward from '../childs/forward'
import Kick from '../childs/kick'
import Leave from '../childs/leave'
import Pin from '../childs/pin'
import Promote from '../childs/promote'
import Restrict from '../childs/restrict'
import Set from '../childs/set'
import Stop from '../childs/stop'
import Unban from '../childs/unban'
import Unpin from '../childs/unpin'
import Upload from '../childs/upload'
import Utils from '../modules/utils'
import Download from '../childs/download'
import TelegramStatic from './telegram.static'

class Telegram {
  public api: API
  public hostname: string
  public token: string

  public static api: API = TelegramStatic.api
  public static hostname: string = TelegramStatic.hostname
  public static token: string = TelegramStatic.token

  public add: Add
  public answer: Answer
  public create: Create
  public delete: Delete
  public download: Download
  public edit: Edit
  public export: Export
  public forward: Forward
  public get: Get
  public kick: Kick
  public leave: Leave
  public pin: Pin
  public promote: Promote
  public restrict: Restrict
  public send: Send
  public set: Set
  public stop: Stop
  public unban: Unban
  public unpin: Unpin
  public upload: Upload
  public webhook: Webhook

  public static add: Add = TelegramStatic.add
  public static answer: Answer = TelegramStatic.answer
  public static create: Create = TelegramStatic.create
  public static delete: Delete = TelegramStatic.delete
  public static download: Download = TelegramStatic.download
  public static edit: Edit = TelegramStatic.edit
  public static export: Export = TelegramStatic.export
  public static forward: Forward = TelegramStatic.forward
  public static get: Get = TelegramStatic.get
  public static kick: Kick = TelegramStatic.kick
  public static leave: Leave = TelegramStatic.leave
  public static pin: Pin = TelegramStatic.pin
  public static promote: Promote = TelegramStatic.promote
  public static restrict: Restrict = TelegramStatic.restrict
  public static send: Send = TelegramStatic.send
  public static set: Set = TelegramStatic.set
  public static stop: Stop = TelegramStatic.stop
  public static unban: Unban = TelegramStatic.unban
  public static unpin: Unpin = TelegramStatic.unpin
  public static upload: Upload = TelegramStatic.upload
  public static webhook: Webhook = TelegramStatic.webhook

  public polling: Polling
  public utils: Utils

  public static polling: Polling = TelegramStatic.polling
  public static utils: Utils = TelegramStatic.utils

  private handlers: Handler[]

  constructor(token: string, hostname: string = '') {
    this.api = new API('api.telegram.org', '/bot' + token + '/')
    this.hostname = hostname
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
    this.kick = new Kick(this)
    this.leave = new Leave(this)
    this.pin = new Pin(this)
    this.promote = new Promote(this)
    this.restrict = new Restrict(this)
    this.send = new Send(this)
    this.set = new Set(this)
    this.stop = new Stop(this)
    this.unban = new Unban(this)
    this.unpin = new Unpin(this)
    this.upload = new Upload(this)
    this.webhook = new Webhook(this)

    this.polling = new Polling(this)
    this.utils = new Utils(this)

    this.handlers = []
  }

  public on<T extends HandlerOptions>(command: string, middleware: HandlerMiddleware, type: HandlerType, options?: T): void {
    this.register<T>(command, middleware, type, options)
  }

  public register<T extends HandlerOptions>(command: string, middleware: HandlerMiddleware, type: HandlerType, options?: T): void {
    let handler: Handler, potential: Handler

    handler = Dummy.handler
    handler.id = ID.unique(this.handlerIds)
    handler.command = command
    handler.middleware = middleware
    handler.type = type
    handler.options = Object.assign(handler.options, options)

    potential = this.findMatchingHandler(handler.command, handler.type)
    potential.id ? (potential.middleware = middleware) : this.handlers.push(handler)
  }

  public handle(update: Update): void {
    let handler: Handler

    switch (true) {
      case has(update, 'message') && has(update, 'message.document'):
        handler = this.findMatchingHandler(this.utils.findCommand(update.message), HandlerType.DOCUMENT)
        handler.middleware(update.message as Message)
        break
      case has(update, 'message') && has(update, 'message.text') && has(update, 'message.reply_to_message'):
        handler = this.findMatchingHandler(this.utils.findCommand(update.message), HandlerType.REPLY_TO_MESSAGE)
        handler.middleware(update.message as Message)
        break
      case has(update, 'message') && has(update, 'message.text'):
        handler = this.findMatchingHandler(this.utils.findCommand(update.message), HandlerType.TEXT)
        handler.middleware(update.message as Message)
        break
      case has(update, 'callback_query') && has(update, 'callback_query.data'):
        handler = this.findMatchingHandler(this.utils.findCommand(update.callback_query), HandlerType.CALLBACK_QUERY)
        handler.middleware(update.callback_query as CallbackQuery)

        if (handler.options.deleteOnCallback) this.delete.message(update.callback_query.message.chat.id, update.callback_query.message.message_id)

        break
    }
  }

  private findMatchingHandler(command: string, type: HandlerType): Handler {
    return this.handlers.find((v: Handler) => v.command === command && v.type === type) || Dummy.handler
  }

  public get commands(): BotCommand[] {
    return this.handlers
      .filter((v: Handler) => v.type === HandlerType.TEXT)
      .reduce((r: BotCommand[], v: Handler) => [...r, { command: v.command, description: v.options.description }], [])
  }

  private get handlerIds(): string[] {
    return this.handlers.reduce((r: string[], v: Handler) => [...r, v.id], [])
  }
}

export default Telegram
