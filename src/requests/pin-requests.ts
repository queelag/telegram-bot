import type { FetchError } from '@aracna/core'
import type { PinChatMessage } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function pinChatMessage(body: PinChatMessage, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, PinChatMessage>('pinChatMessage', body, config)
}
