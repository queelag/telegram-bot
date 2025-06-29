import type { Context } from './interfaces'

export type ClientConnectionMode = 'polling' | 'webhook'

export type ClientListenerMiddleware<T extends UpdateType> = (context: Context[T]) => any

export type InputFile = File | string

export type UpdateType =
  | 'business_connection'
  | 'business_message'
  | 'callback_query'
  | 'channel_post'
  | 'chat_boost'
  | 'chat_join_request'
  | 'chat_member'
  | 'chosen_inline_result'
  | 'deleted_business_messages'
  | 'edited_business_message'
  | 'edited_channel_post'
  | 'edited_message'
  | 'inline_query'
  | 'message'
  | 'message_reaction'
  | 'message_reaction_count'
  | 'my_chat_member'
  | 'poll'
  | 'poll_answer'
  | 'pre_checkout_query'
  | 'purchased_paid_media'
  | 'removed_chat_boost'
  | 'reply_to_message'
  | 'shipping_query'
  | 'start'
