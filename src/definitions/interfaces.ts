import { FetchResponse } from '@queelag/core'
import {
  CallbackQuery,
  ChatJoinRequest,
  ChatMemberUpdated,
  ChosenInlineResult,
  InlineKeyboardButton,
  InlineQuery,
  InputMediaAudio,
  InputMediaDocument,
  InputMediaPhoto,
  InputMediaVideo,
  Message,
  Poll,
  PollAnswer,
  PreCheckoutQuery,
  SendMediaGroup,
  ShippingQuery
} from '@queelag/telegram-types'
import { UpdateType } from './enums'
import { HandlerMiddleware, InputFile } from './types'

export interface APIResponse<T> extends FetchResponse<APIResponseData<T>> {}

export interface APIResponseData<T> {
  ok: boolean
  result: T
}

export interface ConfigurationAPI {
  post: {
    callback: {
      success: <T, U>(body: T, result: U | Error) => void
    }
  }
}

export interface ConfigurationDefault {
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

export interface ConfigurationHandler {
  send: {
    buttons: {
      empty: (chat: number) => Error
    }
  }
}

export interface Context {
  [UpdateType.CALLBACK_QUERY]: CallbackQuery
  [UpdateType.CHANNEL_POST]: Message
  [UpdateType.CHAT_JOIN_REQUEST]: ChatJoinRequest
  [UpdateType.CHAT_MEMBER]: ChatMemberUpdated
  [UpdateType.CHOSEN_INLINE_RESULT]: ChosenInlineResult
  [UpdateType.DOCUMENT]: Message
  [UpdateType.EDITED_CHANNEL_POST]: Message
  [UpdateType.EDITED_MESSAGE]: Message
  [UpdateType.INLINE_QUERY]: InlineQuery
  [UpdateType.MESSAGE]: Message
  [UpdateType.MY_CHAT_MEMBER]: ChatMemberUpdated
  [UpdateType.POLL]: Poll
  [UpdateType.POLL_ANSWER]: PollAnswer
  [UpdateType.PRE_CHECKOUT_QUERY]: PreCheckoutQuery
  [UpdateType.REPLY_TO_MESSAGE]: Message
  [UpdateType.SHIPPING_QUERY]: ShippingQuery
}

export interface HandlerOptions {
  deleteOnCallbackQuery?: boolean
  deleteOnReply?: boolean
  description?: string
}

export interface Handler<T extends UpdateType = any, U extends HandlerOptions = HandlerOptions> {
  id: string
  key: string
  middleware: HandlerMiddleware<T>
  type: UpdateType
  options: U
}

export interface InputMediaAlternative extends Omit<InputMediaAudio | InputMediaDocument | InputMediaPhoto | InputMediaVideo, 'media'> {
  media: InputFile
}

export interface SendMediaGroupAlternative extends Omit<SendMediaGroup, 'media'> {
  media: InputMediaAlternative[]
}
