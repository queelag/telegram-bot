import Child from '../modules/child'
import { ChatPermissions, RestrictChatMember } from '@queelag/telegram-types'

class Restrict extends Child {
  async chatMember(chat: number, user: number, permissions: ChatPermissions, parameters?: Partial<RestrictChatMember>): Promise<boolean | Error> {
    return this.telegram.api.post<RestrictChatMember, boolean>('restrictChatMember', { chat_id: chat, user_id: user, permissions: permissions, ...parameters })
  }
}

export default Restrict
