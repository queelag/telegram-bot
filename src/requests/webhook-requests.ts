import type { FetchError } from '@aracna/core'
import type { DeleteWebhook, SetWebhook, WebhookInfo } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function closeWebhook(token: string): Promise<boolean | FetchError> {
  return TelegramAPI.post('close', undefined, { token })
}

export async function deleteWebhook(token: string, body?: DeleteWebhook): Promise<boolean | FetchError> {
  return TelegramAPI.post('deleteWebhook', body, { token })
}

export async function getWebhookInfo(token: string): Promise<WebhookInfo | FetchError> {
  return TelegramAPI.post('getWebhookInfo', undefined, { token })
}

export async function setWebhook(token: string, body: SetWebhook): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetWebhook>(
    'setWebhook',
    {
      allowed_updates: [
        'business_connection',
        'business_message',
        'callback_query',
        'channel_post',
        'chat_boost',
        'chat_join_request',
        'chat_member',
        'chosen_inline_result',
        'deleted_business_messages',
        'document',
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
        'reply_to_message',
        'shipping_query',
        'start'
      ],
      max_connections: 100,
      ...body
    },
    { token }
  )
}
