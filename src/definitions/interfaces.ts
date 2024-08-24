import type { FetchResponse } from '@aracna/core'
import type {
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
  CallbackQuery as NativeCallbackQuery,
  Poll,
  PollAnswer,
  PreCheckoutQuery,
  SendMediaGroup,
  SendMessage,
  SendPaidMedia,
  ShippingQuery
} from '@aracna/telegram-bot-types'
import type { UpdateType } from './enums'
import type { HandlerMiddleware, InputFile } from './types'

export interface APIResponse<T> extends FetchResponse<APIResponseData<T>> {}

export interface APIResponseData<T> {
  ok: boolean
  result: T
}

export interface CallbackQuery<T = any> extends NativeCallbackQuery {
  body: CallbackQueryBody<T>
}

export interface CallbackQueryBody<T = any> {
  c?: bigint
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
    text: (chatID: bigint) => Promise<InlineKeyboardButton[]>
    url: (chatID: bigint) => Promise<InlineKeyboardButton[]>
    login: (chatID: bigint) => Promise<InlineKeyboardButton[]>
    callback: (chatID: bigint) => Promise<InlineKeyboardButton[]>
    query: (chatID: bigint) => Promise<InlineKeyboardButton[]>
    queryCurrentChat: (chatID: bigint) => Promise<InlineKeyboardButton[]>
    game: (chatID: bigint) => Promise<InlineKeyboardButton[]>
    pay: (chatID: bigint) => Promise<InlineKeyboardButton[]>
  }
}

export interface ConfigurationHandler {
  send: {
    buttons: {
      empty: (chatID: bigint) => Error
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

export interface InputPaidMediaAlternative extends Omit<InputMediaPhoto | InputMediaVideo, 'media'> {
  media: InputFile
}

export interface MessageBody<T = any> {
  chatID?: bigint
  data: T
  type: string
}

export interface ReplyToMessage<T = any> extends Message {
  body: MessageBody<T>
}

export interface SendMediaGroupAlternative extends Omit<SendMediaGroup, 'media'> {
  media: InputMediaAlternative[]
}

export interface SendPaidMediaAlternative extends Omit<SendPaidMedia, 'media'> {
  media: InputPaidMediaAlternative[]
}

export interface SendRepliable<T = any> extends SendMessage {
  data: T
  from_chat_id?: bigint
  text: string
  type: string
}

export interface Start<T = any> extends Message {
  body: MessageBody<T>
}

export interface TelegramName {
  first: string
  last: string
}
