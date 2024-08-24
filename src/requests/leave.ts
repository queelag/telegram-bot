import type { FetchError } from '@aracna/core'
import type { LeaveChat } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function chat(token: string, body: LeaveChat): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, LeaveChat>('leaveChat', body, { token })
}
