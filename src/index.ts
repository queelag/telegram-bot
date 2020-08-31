import { Handler, HandlerMiddleware, HandlerOptions } from './definitions/types'
import { HandlerType } from './definitions/enum'
import Dummy from './modules/dummy'
import { Express, Request, Response } from 'express'
import API from './modules/api'
import { Update, Message, CallbackQuery } from '@queelag/telegram-types'
import { has } from 'lodash'
import ID from './modules/id'
import Webhook from './childs/webhook'
import Send from './childs/send'
import Polling from './childs/polling'
import Get from './childs/get'
import Edit from './childs/edit'
import Delete from './childs/delete'
import Add from './childs/add'
import Answer from './childs/answer'
import Create from './childs/create'
import Export from './childs/export'
import Forward from './childs/forward'
import Kick from './childs/kick'
import Leave from './childs/leave'
import Pin from './childs/pin'
import Promote from './childs/promote'
import Restrict from './childs/restrict'
import Set from './childs/set'
import Stop from './childs/stop'
import Unban from './childs/unban'
import Unpin from './childs/unpin'
import Upload from './childs/upload'
import Utils from './childs/utils'

class Telegram {
  public api: API = new API('api.telegram.org', '/bot/')
  public hostname: string = ''
  public token: string = ''

  public add: Add = new Add(this)
  public answer: Answer = new Answer(this)
  public create: Create = new Create(this)
  public delete: Delete = new Delete(this)
  public edit: Edit = new Edit(this)
  public export: Export = new Export(this)
  public forward: Forward = new Forward(this)
  public get: Get = new Get(this)
  public kick: Kick = new Kick(this)
  public leave: Leave = new Leave(this)
  public pin: Pin = new Pin(this)
  public promote: Promote = new Promote(this)
  public restrict: Restrict = new Restrict(this)
  public send: Send = new Send(this)
  public set: Set = new Set(this)
  public stop: Stop = new Stop(this)
  public unban: Unban = new Unban(this)
  public unpin: Unpin = new Unpin(this)
  public upload: Upload = new Upload(this)
  public webhook: Webhook = new Webhook(this)

  public polling: Polling = new Polling(this)
  public utils: Utils = new Utils(this)

  private express: Express = {} as any
  private handlers: Handler[] = []

  constructor(express: Express, hostname: string, token: string) {
    this.api = new API('api.telegram.org', '/bot' + token + '/')
    this.express = express
    this.hostname = hostname
    this.token = token
  }

  listen(): void {
    this.express.post('/bot' + this.token, (request: Request<any, any, Update>, response: Response) => {
      this.handle(request.body)
      response.status(200).send()
    })
  }

  on(command: string, middleware: HandlerMiddleware, type: HandlerType, options?: HandlerOptions): void {
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

  handle(update: Update): void {
    let handler: Handler

    switch (true) {
      case has(update, 'message') && has(update, 'message.text') && has(update, 'message.document'):
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

  private get handlerIds(): string[] {
    return this.handlers.reduce((r: string[], v: Handler) => [...r, v.id], [])
  }
}

export default Telegram
