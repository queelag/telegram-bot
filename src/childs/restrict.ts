import type { FetchError } from '@aracna/core'
import type { ChatPermissions, RestrictChatMember } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Restrict extends Child {
  async chatMember(permissions: ChatPermissions, parameters: Omit<RestrictChatMember, 'permissions'>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, RestrictChatMember>('restrictChatMember', {
      permissions: permissions,
      ...parameters
    })
  }
}
