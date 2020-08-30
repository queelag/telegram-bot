import { HandlerType } from './enum'
import { Message, CallbackQuery } from 'telegram-typings'

export type HandlerMiddleware = (context: Message | CallbackQuery) => any

export type Handler = {
  id: string
  command: string
  middleware: HandlerMiddleware
  type: HandlerType
}

export type Protocol = 'http' | 'https'
