import { FetchError } from '@queelag/core'
import { BanChatMember } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Ban extends Child {
  async chatMember(chat: number, user: number, parameters?: Partial<BanChatMember>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, BanChatMember>('banChatMember', { chat_id: chat, user_id: user, ...parameters })
  }
}
