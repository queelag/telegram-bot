import { FetchError } from '@aracna/core'
import { UnpinChatMessage } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Unpin extends Child {
  async chatMessage(chatID: number): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, UnpinChatMessage>('unpinChatMessage', { chat_id: chatID })
  }
}
