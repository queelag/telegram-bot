import { FetchError } from '@queelag/core'
import { UnbanChatMember } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Unban extends Child {
  async chatMember(chat: number, user: number): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, UnbanChatMember>('unbanChatMember', { chat_id: chat, user_id: user })
  }
}
