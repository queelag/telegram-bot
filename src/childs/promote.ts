import { PromoteChatMember } from '@queelag/telegram-types'
import Child from '../modules/child'

class Promote extends Child {
  async chatMember(chat: number, user: number, parameters?: Partial<PromoteChatMember>): Promise<boolean | Error> {
    return this.telegram.api.post<PromoteChatMember, boolean>('promoteChatMember', { chat_id: chat, user_id: user, ...parameters })
  }
}

export default Promote
