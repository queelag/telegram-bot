import {
  CallbackQuery,
  InlineKeyboardButton,
  InputMediaAudio,
  InputMediaDocument,
  InputMediaPhoto,
  InputMediaVideo,
  Message,
  SendMediaGroup
} from '@queelag/telegram-types'
import { HandlerType } from './enums'

export type Context = Message | CallbackQuery

export type HandlerMiddleware = (context: Context) => any

export type HandlerOptions = {
  deleteOnCallback?: boolean
  deleteOnReply?: boolean
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

export type ConfigurationAPI = {
  post: {
    callback: {
      success: <T, U>(body: T, result: U | Error) => void
    }
  }
}

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

export type InputMediaAlternative = { media: InputFile } & Omit<InputMediaAudio | InputMediaDocument | InputMediaPhoto | InputMediaVideo, 'media'>

export type SendMediaGroupAlternative = {
  media: InputMediaAlternative[]
} & Omit<SendMediaGroup, 'media'>
