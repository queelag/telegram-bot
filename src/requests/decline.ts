import type { FetchError } from '@aracna/core'
import type { DeclineChatJoinRequest } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function declineChatJoinRequest(token: string, body: DeclineChatJoinRequest): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeclineChatJoinRequest>('declineChatJoinRequest', body, { token })
}
