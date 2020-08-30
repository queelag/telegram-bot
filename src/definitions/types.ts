import { HandlerType } from './enum'
import { Message, CallbackQuery } from '@queelag/telegram-types'

export type HandlerMiddleware = (context: Message | CallbackQuery) => any

export type Handler = {
  id: string
  command: string
  middleware: HandlerMiddleware
  type: HandlerType
}

export type Protocol = 'http' | 'https'
