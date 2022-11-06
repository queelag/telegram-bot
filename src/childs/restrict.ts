import { FetchError } from '@queelag/core'
import { ChatPermissions, RestrictChatMember } from '@queelag/telegram-bot-types'
import { Child } from '../modules/child'

export class Restrict extends Child {
  async chatMember(chatID: number, userID: number, permissions: ChatPermissions, parameters?: Partial<RestrictChatMember>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, RestrictChatMember>('restrictChatMember', {
      chat_id: chatID,
      permissions: permissions,
      user_id: userID,
      ...parameters
    })
  }
}
