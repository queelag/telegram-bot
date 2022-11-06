import { FetchError } from '@queelag/core'
import { PinChatMessage } from '@queelag/telegram-bot-types'
import { Child } from '../modules/child'

export class Pin extends Child {
  async chatMessage(chatID: number, message: number, parameters?: Partial<PinChatMessage>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, PinChatMessage>('pinChatMessage', { chat_id: chatID, message_id: message, ...parameters })
  }
}
