import type { FetchError } from '@aracna/core'
import type { CopyMessage, CopyMessages, MessageId } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function copyMessage(token: string, body: CopyMessage): Promise<MessageId | FetchError> {
  return TelegramAPI.post<MessageId, CopyMessage>('copyMessage', body, { token })
}

export async function copyMessages(token: string, body: CopyMessages): Promise<MessageId[] | FetchError> {
  return TelegramAPI.post<MessageId[], CopyMessages>('copyMessages', body, { token })
}
