import type { FetchError } from '@aracna/core'
import type { DeleteWebhook, SetWebhook, WebhookInfo } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import { DEFAULT_ALLOWED_UPDATES } from '../definitions/constants'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function closeWebhook(config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post('close', undefined, config)
}

export async function deleteWebhook(body?: DeleteWebhook, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post('deleteWebhook', body, config)
}

export async function getWebhookInfo(config?: TelegramApiConfig): Promise<WebhookInfo | FetchError> {
  return TelegramAPI.post('getWebhookInfo', undefined, config)
}

export async function setWebhook(body: SetWebhook, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SetWebhook>('setWebhook', { allowed_updates: DEFAULT_ALLOWED_UPDATES, ...body }, config)
}
