import type { FetchError } from '@aracna/core'
import type { RestrictChatMember } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api.js'
import type { TelegramApiConfig } from '../definitions/interfaces.js'

export async function restrictChatMember(body: RestrictChatMember, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, RestrictChatMember>('restrictChatMember', body, config)
}
