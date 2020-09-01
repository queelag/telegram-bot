import { CallbackQuery, Message } from '@queelag/telegram-types'
import { HandlerType } from './enums'

export type Context = Message | CallbackQuery

export type HandlerMiddleware = (context: Context) => any

export type HandlerOptions = {
  deleteOnCallback?: boolean
  description?: string
}

export type Handler = {
  id: string
  command: string
  middleware: HandlerMiddleware
  type: HandlerType
  options: HandlerOptions
}

export type Protocol = 'http' | 'https'

export type InputFile = Buffer | string
