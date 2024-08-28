import type { FetchError } from '@aracna/core'
import type { DeclineChatJoinRequest } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function declineChatJoinRequest(body: DeclineChatJoinRequest, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeclineChatJoinRequest>('declineChatJoinRequest', body, config)
}
