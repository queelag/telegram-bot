import { DecodeJsonOptions, EncodeJsonOptions } from '@aracna/core'
import { CallbackQueryBody, ClientListenerOptions, ReplyToMessageBody, StartBody } from './interfaces'

export const DEFAULT_ALLOWED_UPDATES: string[] = [
  'business_connection',
  'business_message',
  'callback_query',
  'channel_post',
  'chat_boost',
  'chat_join_request',
  'chat_member',
  'chosen_inline_result',
  'deleted_business_messages',
  'edited_business_message',
  'edited_channel_post',
  'edited_message',
  'inline_query',
  'message',
  'message_reaction',
  'message_reaction_count',
  'my_chat_member',
  'poll',
  'poll_answer',
  'pre_checkout_query',
  'removed_chat_boost',
  'shipping_query'
]

export const DEFAULT_CALLBACK_QUERY_BODY: () => CallbackQueryBody<any> = () => ({
  d: null
})

export const DEFAULT_CLIENT_LISTENER_OPTIONS: () => ClientListenerOptions = () => ({
  deleteOnCallbackQuery: false,
  deleteOnMessageStart: false,
  deleteOnReply: false
})

export const DEFAULT_CLIENT_POLLING_MS: number = 1000

export const DEFAULT_DECODE_JSON_OPTIONS: () => DecodeJsonOptions = () => ({
  castBigIntStringToBigInt: true,
  castUnsafeIntToBigInt: true
})

export const DEFAULT_ENCODE_JSON_OPTIONS: () => EncodeJsonOptions = () => ({
  castBigIntToString: true
})

export const DEFAULT_REPLY_TO_MESSAGE_BODY: () => ReplyToMessageBody<any> = () => ({
  d: null
})

export const DEFAULT_START_MESSAGE_BODY: () => StartBody<any> = () => ({
  d: null
})

export const REGEXP_COMMAND: RegExp = /\/[a-z_]+/m
export const REGEXP_COMMAND_WITH_USERNAME: RegExp = /\/[a-zA-Z0-9_@]+/
