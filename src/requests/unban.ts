import type { FetchError } from '@aracna/core'
import type { UnbanChatMember, UnbanChatSenderChat } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Unban extends Child {
  async chatMember(parameters: UnbanChatMember): Promise<boolean | FetchError> {
    return TelegramAPI.post<boolean, UnbanChatMember>('unbanChatMember', parameters)
  }

  async chatSenderChat(parameters: UnbanChatSenderChat): Promise<boolean | FetchError> {
    return TelegramAPI.post<boolean, UnbanChatSenderChat>('unbanChatSenderChat', parameters)
  }
}
