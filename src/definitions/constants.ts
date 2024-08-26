import { CallbackQueryBody, HandlerOptions, MessageBody } from './interfaces'

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

export const DEFAULT_CALLBACK_QUERY_BODY: () => CallbackQueryBody = () => ({
  d: null,
  t: ''
})

export const DEFAULT_HANDLER_OPTIONS: () => HandlerOptions = () => ({
  deleteOnCallbackQuery: true,
  deleteOnMessageStart: true,
  deleteOnReply: true
})

export const DEFAULT_MESSAGE_BODY: () => MessageBody = () => ({
  d: null,
  t: ''
})

export const REGEXP_COMMAND: RegExp = /\/[a-z_]+/m
export const REGEXP_COMMAND_WITH_USERNAME: RegExp = /\/[a-zA-Z0-9_@]+/
