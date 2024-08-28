import type { FetchError } from '@aracna/core'
import type { LeaveChat } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function leaveChat(body: LeaveChat, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, LeaveChat>('leaveChat', body, config)
}
