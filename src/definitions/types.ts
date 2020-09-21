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
    text: (chat: number) => Promise<InlineKeyboardButton[]>
    url: (chat: number) => Promise<InlineKeyboardButton[]>
    login: (chat: number) => Promise<InlineKeyboardButton[]>
    callback: (chat: number) => Promise<InlineKeyboardButton[]>
    query: (chat: number) => Promise<InlineKeyboardButton[]>
    queryCurrentChat: (chat: number) => Promise<InlineKeyboardButton[]>
    game: (chat: number) => Promise<InlineKeyboardButton[]>
    pay: (chat: number) => Promise<InlineKeyboardButton[]>
  }
}

export type ConfigurationHandler = {
  send: {
    buttons: {
      empty: (chat: number) => Error
    }
  }
}
