import { FetchError } from '@queelag/core'
import { UnpinChatMessage } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Unpin extends Child {
  async chatMessage(chatID: number): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, UnpinChatMessage>('unpinChatMessage', { chat_id: chatID })
  }
}
