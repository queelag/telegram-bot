import { FetchError } from '@queelag/core'
import { PromoteChatMember } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Promote extends Child {
  async chatMember(chat: number, user: number, parameters?: Partial<PromoteChatMember>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, PromoteChatMember>('promoteChatMember', { chat_id: chat, user_id: user, ...parameters })
  }
}
