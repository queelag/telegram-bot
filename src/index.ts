import { Handler, HandlerMiddleware } from './definitions/types'
import { HandlerType } from './definitions/enum'
import Dummy from './modules/dummy'
import { Express, Request, Response } from 'express'
import API from './modules/api'
import { Update } from '@queelag/telegram-types'
import { has, last } from 'lodash'
import ID from './modules/id'
import Regex from './modules/regex'
import Webhook from './components/webhook'
import Send from './components/send'
import Poll from './components/poll'

class Telegram {
  public api: API = new API('', '')
  public hostname: string = ''
  public token: string = ''

  public poll: Poll = new Poll(this)
  public send: Send = new Send(this)
  public webhook: Webhook = new Webhook(this)

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

  handle(update: Update): void {
    let handler: Handler

    switch (true) {
      case has(update, 'message') && has(update, 'message.text') && has(update, 'message.document'):
        handler = this.findMatchingHandler(this.extrapolateCommand(update.message.text), HandlerType.DOCUMENT)
        handler.middleware(update.message)
        break
      case has(update, 'message') && has(update, 'message.text'):
        handler = this.findMatchingHandler(this.extrapolateCommand(update.message.text), HandlerType.TEXT)
        handler.middleware(update.message)
        break
      case has(update, 'callback_query') && has(update, 'callback_query.data'):
        handler = this.findMatchingHandler(this.extrapolateCommand(update.callback_query.data), HandlerType.CALLBACK_QUERY)
        handler.middleware(update.callback_query)
        break
    }
  }

  on(command: string, middleware: HandlerMiddleware, type: HandlerType): void {
    let handler: Handler, potential: Handler

    handler = Dummy.handler
    handler.id = ID.unique(this.handlerIds)
    handler.command = command
    handler.middleware = middleware
    handler.type = type

    potential = this.findMatchingHandler(handler.command, handler.type)
    potential.id ? (potential.middleware = middleware) : this.handlers.push(handler)
  }

  private extrapolateCommand(string: string): string {
    return (Regex.command.exec(string) || [''])[0].substring(1)
  }

  private findMatchingHandler(command: string, type: HandlerType): Handler {
    return this.handlers.find((v: Handler) => v.command === command && v.type === type) || Dummy.handler
  }

  private get handlerIds(): string[] {
    return this.handlers.reduce((r: string[], v: Handler) => [...r, v.id], [])
  }
}

export default Telegram
