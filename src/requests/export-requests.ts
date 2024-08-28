import type { FetchError } from '@aracna/core'
import type { ExportChatInviteLink } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function exportChatInviteLink(body: ExportChatInviteLink, config?: TelegramApiConfig): Promise<string | FetchError> {
  return TelegramAPI.post<string, ExportChatInviteLink>('exportChatInviteLink', body, config)
}
