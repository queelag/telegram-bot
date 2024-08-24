import type { FetchError } from '@aracna/core'
import type { PinChatMessage } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Pin extends Child {
  async chatMessage(chatID: bigint, messageID: number, parameters?: Partial<PinChatMessage>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, PinChatMessage>('pinChatMessage', { chat_id: chatID, message_id: messageID, ...parameters })
  }
}
