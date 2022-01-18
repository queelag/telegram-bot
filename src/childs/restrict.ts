import { FetchError } from '@queelag/core'
import { ChatPermissions, RestrictChatMember } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Restrict extends Child {
  async chatMember(chat: number, user: number, permissions: ChatPermissions, parameters?: Partial<RestrictChatMember>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, RestrictChatMember>('restrictChatMember', { chat_id: chat, user_id: user, permissions: permissions, ...parameters })
  }
}
