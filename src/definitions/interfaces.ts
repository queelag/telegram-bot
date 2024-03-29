import { FetchResponse } from '@aracna/core'
import {
  CallbackQuery as NativeCallbackQuery,
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
} from '@aracna/telegram-bot-types'
import { UpdateType } from './enums'
import { HandlerMiddleware, InputFile } from './types'

export interface APIResponse<T> extends FetchResponse<APIResponseData<T>> {}

export interface APIResponseData<T> {
  ok: boolean
  result: T
}

export interface CallbackQuery<T = any> extends NativeCallbackQuery {
  body: CallbackQueryBody<T>
}

export interface CallbackQueryBody<T = any> {
  c?: number
  d: T
  t: string
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
    text: (chatID: number) => Promise<InlineKeyboardButton[]>
    url: (chatID: number) => Promise<InlineKeyboardButton[]>
    login: (chatID: number) => Promise<InlineKeyboardButton[]>
    callback: (chatID: number) => Promise<InlineKeyboardButton[]>
    query: (chatID: number) => Promise<InlineKeyboardButton[]>
    queryCurrentChat: (chatID: number) => Promise<InlineKeyboardButton[]>
    game: (chatID: number) => Promise<InlineKeyboardButton[]>
    pay: (chatID: number) => Promise<InlineKeyboardButton[]>
  }
}

export interface ConfigurationHandler {
  send: {
    buttons: {
      empty: (chatID: number) => Error
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
  [UpdateType.REPLY_TO_MESSAGE]: ReplyToMessage
  [UpdateType.SHIPPING_QUERY]: ShippingQuery
  [UpdateType.START]: Start
}

export interface Handler<T extends UpdateType = any, U extends HandlerOptions = HandlerOptions> {
  description?: string
  id: string
  key?: string
  middleware: HandlerMiddleware<T>
  options: U
  type: UpdateType
}

export interface HandlerOptions {
  deleteOnCallbackQuery?: boolean
  deleteOnReply?: boolean
  deleteOnMessageStart?: boolean
}

export interface InputMediaAlternative extends Omit<InputMediaAudio | InputMediaDocument | InputMediaPhoto | InputMediaVideo, 'media'> {
  media: InputFile
}

export interface MessageBody<T = any> {
  chatID?: number
  data: T
  type: string
}

export interface ReplyToMessage<T = any> extends Message {
  body: MessageBody<T>
}

export interface SendMediaGroupAlternative extends Omit<SendMediaGroup, 'media'> {
  media: InputMediaAlternative[]
}

export interface Start<T = any> extends Message {
  body: MessageBody<T>
}

export interface TelegramName {
  first: string
  last: string
}
