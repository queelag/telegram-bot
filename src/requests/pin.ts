import type { FetchError } from '@aracna/core'
import type { PinChatMessage } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function chatMessage(token: string, body: PinChatMessage): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, PinChatMessage>('pinChatMessage', body, { token })
}
