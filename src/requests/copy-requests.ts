import type { FetchError } from '@aracna/core'
import type { CopyMessage, CopyMessages, MessageId } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api.js'
import type { TelegramApiConfig } from '../definitions/interfaces.js'

export async function copyMessage(body: CopyMessage, config?: TelegramApiConfig): Promise<MessageId | FetchError> {
  return TelegramAPI.post<MessageId, CopyMessage>('copyMessage', body, config)
}

export async function copyMessages(body: CopyMessages, config?: TelegramApiConfig): Promise<MessageId[] | FetchError> {
  return TelegramAPI.post<MessageId[], CopyMessages>('copyMessages', body, config)
}
