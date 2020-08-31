import Child from '../modules/child'
import { UnbanChatMember } from '@queelag/telegram-types'

class Unban extends Child {
  async chatMember(chat: number, user: number): Promise<boolean | Error> {
    return this.telegram.api.post<UnbanChatMember, boolean>('unbanChatMember', { chat_id: chat, user_id: user })
  }
}

export default Unban
