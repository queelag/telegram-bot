import type { FetchError } from '@aracna/core'
import type { ApproveChatJoinRequest } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function approveChatJoinRequest(body: ApproveChatJoinRequest, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, ApproveChatJoinRequest>('approveChatJoinRequest', body, config)
}
