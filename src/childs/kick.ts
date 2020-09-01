import { KickChatMember } from '@queelag/telegram-types'
import Child from '../modules/child'

class Kick extends Child {
  async chatMember(chat: number, user: number, parameters?: Partial<KickChatMember>): Promise<boolean | Error> {
    return this.telegram.api.post<KickChatMember, boolean>('kickChatMember', { chat_id: chat, user_id: user, ...parameters })
  }
}

export default Kick
