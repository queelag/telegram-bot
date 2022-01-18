import { FetchError } from '@queelag/core'
import { ExportChatInviteLink } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Export extends Child {
  async chatInviteLink(chat: number): Promise<string | FetchError> {
    return this.telegram.api.post<string, ExportChatInviteLink>('exportChatInviteLink', { chat_id: chat })
  }
}
