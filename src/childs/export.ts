import Child from '../modules/child'
import { ExportChatInviteLink } from '@queelag/telegram-types'

class Export extends Child {
  chatInviteLink(chat: number): Promise<string | Error> {
    return this.telegram.api.post<ExportChatInviteLink, string>('exportChatInviteLink', { chat_id: chat })
  }
}

export default Export
