import type { FetchError } from '@aracna/core'
import type { ApproveChatJoinRequest } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function approveChatJoinRequest(token: string, body: ApproveChatJoinRequest): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, ApproveChatJoinRequest>('approveChatJoinRequest', body, { token })
}
