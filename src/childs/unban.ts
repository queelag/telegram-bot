import { FetchError } from '@aracna/core'
import { UnbanChatMember } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Unban extends Child {
  async chatMember(chatID: number, userID: number): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, UnbanChatMember>('unbanChatMember', { chat_id: chatID, user_id: userID })
  }
}
