import type { FetchError } from '@aracna/core'
import type { ExportChatInviteLink } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Export extends Child {
  async chatInviteLink(chatID: bigint, parameters?: Partial<ExportChatInviteLink>): Promise<string | FetchError> {
    return this.telegram.api.post<string, ExportChatInviteLink>('exportChatInviteLink', { chat_id: chatID, ...parameters })
  }
}
