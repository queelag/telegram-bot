import type { FetchError } from '@aracna/core'
import type { ChatInviteLink, RevokeChatInviteLink } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function chatInviteLink(token: string, body: RevokeChatInviteLink): Promise<ChatInviteLink | FetchError> {
  return TelegramAPI.post<ChatInviteLink, RevokeChatInviteLink>('revokeChatInviteLink', body, { token })
}
