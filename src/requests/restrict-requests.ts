import type { FetchError } from '@aracna/core'
import type { RestrictChatMember } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function restrictChatMember(token: string, body: RestrictChatMember): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, RestrictChatMember>('restrictChatMember', body, { token })
}
