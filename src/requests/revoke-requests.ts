import type { FetchError } from '@aracna/core'
import type { ChatInviteLink, RevokeChatInviteLink } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function revokeChatInviteLink(body: RevokeChatInviteLink, config?: TelegramApiConfig): Promise<ChatInviteLink | FetchError> {
  return TelegramAPI.post<ChatInviteLink, RevokeChatInviteLink>('revokeChatInviteLink', body, config)
}
