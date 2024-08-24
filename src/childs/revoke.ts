import type { FetchError } from '@aracna/core'
import type { ChatInviteLink, RevokeChatInviteLink } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Revoke extends Child {
  async chatInviteLink(chatID: bigint, inviteLink: string, parameters?: Partial<RevokeChatInviteLink>): Promise<ChatInviteLink | FetchError> {
    return this.telegram.api.post<ChatInviteLink, RevokeChatInviteLink>('revokeChatInviteLink', { chat_id: chatID, invite_link: inviteLink, ...parameters })
  }
}
