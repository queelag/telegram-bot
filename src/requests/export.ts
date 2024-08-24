import type { FetchError } from '@aracna/core'
import type { ExportChatInviteLink } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function exportChatInviteLink(token: string, body: ExportChatInviteLink): Promise<string | FetchError> {
  return TelegramAPI.post<string, ExportChatInviteLink>('exportChatInviteLink', body, { token })
}
