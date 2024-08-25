import type { FetchError } from '@aracna/core'
import type { PromoteChatMember } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function promoteChatMember(token: string, body: PromoteChatMember): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, PromoteChatMember>('promoteChatMember', body, { token })
}
