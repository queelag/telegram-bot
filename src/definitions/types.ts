import { CallbackQuery, InlineKeyboardButton, Message } from '@queelag/telegram-types'
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

export type ConfigurationDefault = {
  buttons: {
    text: InlineKeyboardButton[]
    url: InlineKeyboardButton[]
    login: InlineKeyboardButton[]
    callback: InlineKeyboardButton[]
    query: InlineKeyboardButton[]
    queryCurrentChat: InlineKeyboardButton[]
    game: InlineKeyboardButton[]
    pay: InlineKeyboardButton[]
  }
}
