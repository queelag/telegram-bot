import type {
  BusinessConnection,
  BusinessMessagesDeleted,
  ChatBoostRemoved,
  ChatBoostUpdated,
  ChatJoinRequest,
  ChatMemberUpdated,
  ChosenInlineResult,
  InlineQuery,
  InputMediaAudio,
  InputMediaDocument,
  InputMediaPhoto,
  InputMediaVideo,
  Message,
  MessageReactionCountUpdated,
  MessageReactionUpdated,
  CallbackQuery as NativeCallbackQuery,
  Poll,
  PollAnswer,
  PreCheckoutQuery,
  SendMediaGroup,
  SendMessage,
  SendPaidMedia,
  ShippingQuery
} from '@aracna/telegram-bot-types'
import type { HandlerMiddleware, InputFile, UpdateType } from './types'

export interface CallbackQuery<T = any> extends NativeCallbackQuery {
  body: CallbackQueryBody<T>
}

export interface CallbackQueryBody<T = any> {
  c?: bigint
  d: T
  t: string
}

// export interface ConfigurationAPI {
//   post: {
//     callback: {
//       success: <T, U>(body: T, result: U | Error) => void
//     }
//   }
// }

// export interface ConfigurationDefault {
//   buttons: {
//     text: (chatID: bigint) => Promise<InlineKeyboardButton[]>
//     url: (chatID: bigint) => Promise<InlineKeyboardButton[]>
//     login: (chatID: bigint) => Promise<InlineKeyboardButton[]>
//     callback: (chatID: bigint) => Promise<InlineKeyboardButton[]>
//     query: (chatID: bigint) => Promise<InlineKeyboardButton[]>
//     queryCurrentChat: (chatID: bigint) => Promise<InlineKeyboardButton[]>
//     game: (chatID: bigint) => Promise<InlineKeyboardButton[]>
//     pay: (chatID: bigint) => Promise<InlineKeyboardButton[]>
//   }
// }

// export interface ConfigurationHandler {
//   send: {
//     buttons: {
//       empty: (chatID: bigint) => Error
//     }
//   }
// }

export interface Context {
  business_connection: BusinessConnection
  business_message: Message
  callback_query: CallbackQuery
  channel_post: Message
  chat_boost: ChatBoostUpdated
  chat_join_request: ChatJoinRequest
  chat_member: ChatMemberUpdated
  chosen_inline_result: ChosenInlineResult
  deleted_business_messages: BusinessMessagesDeleted
  document: Message
  edited_business_message: Message
  edited_channel_post: Message
  edited_message: Message
  inline_query: InlineQuery
  message: Message
  message_reaction: MessageReactionUpdated
  message_reaction_count: MessageReactionCountUpdated
  my_chat_member: ChatMemberUpdated
  poll: Poll
  poll_answer: PollAnswer
  pre_checkout_query: PreCheckoutQuery
  removed_chat_boost: ChatBoostRemoved
  reply_to_message: ReplyToMessage
  shipping_query: ShippingQuery
  start: StartMessage
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

export interface StartMessage<T = any> extends Message {
  body: MessageBody<T>
}
