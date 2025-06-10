import type { FetchResponse, RestApiConfig } from '@aracna/core'
import type {
  BusinessConnection,
  BusinessMessagesDeleted,
  ChatBoostRemoved,
  ChatBoostUpdated,
  ChatJoinRequest,
  ChatMemberUpdated,
  ChosenInlineResult,
  DeleteWebhook,
  EditMessageMedia,
  GetUpdates,
  InlineQuery,
  InputMediaAudio,
  InputMediaDocument,
  InputMediaPhoto,
  InputMediaVideo,
  Message,
  MessageReactionCountUpdated,
  MessageReactionUpdated,
  CallbackQuery as NativeCallbackQuery,
  PaidMediaPurchased,
  Poll,
  PollAnswer,
  PreCheckoutQuery,
  SendMediaGroup,
  SendMessage,
  SendPaidMedia,
  SetWebhook,
  ShippingQuery
} from '@aracna/telegram-bot-types'
import type { ClientListenerMiddleware, InputFile, UpdateType } from './types'

export interface CallbackQuery<T = any> extends NativeCallbackQuery {
  body: CallbackQueryBody<T>
}

export interface CallbackQueryBody<T = any> {
  c?: bigint | number
  d?: T
  m?: string
}

export interface ClientConnectionOptions {
  polling?: ClientConnectionOptionsPolling
  webhook?: ClientConnectionOptionsWebhook
}

export interface ClientConnectionOptionsPolling extends GetUpdates {
  ms?: number
}

export interface ClientConnectionOptionsWebhook extends SetWebhook {
  delete?: DeleteWebhook
}

export interface ClientDisconnectOptions {
  webhook?: DeleteWebhook
}

export interface ClientListener<T extends UpdateType = any, U extends ClientListenerOptions = ClientListenerOptions> {
  command?: string
  description?: string
  id: string
  middleware: ClientListenerMiddleware<T>
  options: Omit<U, 'command' | 'description'>
  type: UpdateType
}

export interface ClientListenerOptions {
  command?: string
  deleteOnCallbackQuery?: boolean
  deleteOnReply?: boolean
  deleteOnMessageStart?: boolean
  description?: string
}

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
  purchased_paid_media: PaidMediaPurchased
  removed_chat_boost: ChatBoostRemoved
  reply_to_message: ReplyToMessage
  shipping_query: ShippingQuery
  start: Start
}

export interface EditMessageMediaAlternative extends Omit<EditMessageMedia, 'media'> {
  media: InputMediaAlternative
}

export interface EncodeCallbackQueryBodyOptions<T = any> {
  chatID?: bigint | number
  command?: string
  data?: T
}

export interface EncodeReplyToMessageBodyOptions<T = any> {
  chatID?: bigint | number
  command?: string
  data?: T
}

export interface EncodeStartBodyOptions<T = any> {
  chatID?: bigint | number
  command?: string
  data?: T
}

export interface InputMediaAlternative extends Omit<InputMediaAudio | InputMediaDocument | InputMediaPhoto | InputMediaVideo, 'media'> {
  media: InputFile
}

export interface InputPaidMediaAlternative extends Omit<InputMediaPhoto | InputMediaVideo, 'media'> {
  media: InputFile
}

export interface ReplyToMessage<T = any> extends Message {
  body: ReplyToMessageBody<T>
}

export interface ReplyToMessageBody<T = any> {
  c?: bigint | number
  d?: T
  m?: string
}

export interface SendMediaGroupAlternative extends Omit<SendMediaGroup, 'media'> {
  media: InputMediaAlternative[]
}

export interface SendPaidMediaAlternative extends Omit<SendPaidMedia, 'media'> {
  media: InputPaidMediaAlternative[]
}

export interface SendRepliableMessage<T = any> extends SendMessage {
  command?: string
  data: T
  from_chat_id?: bigint
}

export interface Start<T = any> extends Message {
  body: StartBody<T>
}

export interface StartBody<T = any> {
  c?: bigint | number
  d?: T
  m?: string
}

export interface TelegramApiConfig extends RestApiConfig {
  token?: string
}

export interface TelegramApiResponse<T> extends FetchResponse<TelegramApiResponseData<T>> {}

export interface TelegramApiResponseData<T> {
  ok: boolean
  result: T
}

export interface TelegramFileApiConfig extends TelegramApiConfig {}
