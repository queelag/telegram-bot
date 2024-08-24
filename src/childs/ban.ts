import type { FetchError } from '@aracna/core'
import type { BanChatMember, BanChatSenderChat } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Ban extends Child {
  async chatMember(parameters: BanChatMember): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, BanChatMember>('banChatMember', parameters)
  }

  async chatSenderChat(parameters: BanChatSenderChat): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, BanChatSenderChat>('banChatSenderChat', parameters)
  }
}
