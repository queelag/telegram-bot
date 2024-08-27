import type { FetchError } from '@aracna/core'
import type { DeleteWebhook, SetWebhook, WebhookInfo } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import { DEFAULT_ALLOWED_UPDATES } from '../definitions/constants'

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
  return TelegramAPI.post<boolean, SetWebhook>('setWebhook', { allowed_updates: DEFAULT_ALLOWED_UPDATES, ...body }, { token })
}
