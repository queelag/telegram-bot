import { ExportChatInviteLink } from '@queelag/telegram-types'
import Child from '../modules/child'

class Export extends Child {
  async chatInviteLink(chat: number): Promise<string | Error> {
    return this.telegram.api.post<ExportChatInviteLink, string>('exportChatInviteLink', { chat_id: chat })
  }
}

export default Export
