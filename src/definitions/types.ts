import { HandlerType } from './enum'
import { Message, CallbackQuery } from '@queelag/telegram-types'

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
