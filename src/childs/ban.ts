import { BanChatMember } from '@queelag/telegram-types'
import Child from '../modules/child'

class Ban extends Child {
  async chatMember(chat: number, user: number, parameters?: Partial<BanChatMember>): Promise<boolean | Error> {
    return this.telegram.api.post<BanChatMember, boolean>('banChatMember', { chat_id: chat, user_id: user, ...parameters })
  }
}

export default Ban
