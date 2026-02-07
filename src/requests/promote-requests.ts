import type { FetchError } from '@aracna/core'
import type { PromoteChatMember } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api.js'
import type { TelegramApiConfig } from '../definitions/interfaces.js'

export async function promoteChatMember(body: PromoteChatMember, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, PromoteChatMember>('promoteChatMember', body, config)
}
