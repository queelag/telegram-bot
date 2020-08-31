import Child from '../modules/child'
import { KickChatMember } from '@queelag/telegram-types'

class Kick extends Child {
  chatMember(chat: number, user: number, parameters?: KickChatMember): Promise<boolean | Error> {
    return this.telegram.api.post<KickChatMember, boolean>('kickChatMember', { chat_id: chat, user_id: user, ...parameters })
  }
}

export default Kick
