import { FetchError } from '@queelag/core'
import { ForwardMessage, Message } from '@queelag/telegram-bot-types'
import { Child } from '../modules/child'

export class Forward extends Child {
  async message(chatID: number, fromChatID: number, messageID: number, parameters?: Partial<ForwardMessage>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, ForwardMessage>('forwardMessage', {
      chat_id: chatID,
      from_chat_id: fromChatID,
      message_id: messageID,
      ...parameters
    })
  }
}
