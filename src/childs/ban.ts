import { FetchError } from '@aracna/core'
import { BanChatMember } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Ban extends Child {
  async chatMember(chatID: number, userID: number, parameters?: Partial<BanChatMember>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, BanChatMember>('banChatMember', { chat_id: chatID, user_id: userID, ...parameters })
  }
}
