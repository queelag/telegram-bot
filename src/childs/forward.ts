import { FetchError } from '@queelag/core'
import { ForwardMessage, Message } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Forward extends Child {
  async message(chat: number, fromChat: number, message: number, parameters?: Partial<ForwardMessage>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, ForwardMessage>('forwardMessage', { chat_id: chat, from_chat_id: fromChat, message_id: message, ...parameters })
  }
}
