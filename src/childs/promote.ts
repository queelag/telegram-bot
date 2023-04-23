import { FetchError } from '@aracna/core'
import { PromoteChatMember } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Promote extends Child {
  async chatMember(chatID: number, userID: number, parameters?: Partial<PromoteChatMember>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, PromoteChatMember>('promoteChatMember', { chat_id: chatID, user_id: userID, ...parameters })
  }
}
