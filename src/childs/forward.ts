import { ForwardMessage, Message } from '@queelag/telegram-types'
import Child from '../modules/child'

class Forward extends Child {
  async message(chat: number, fromChat: number, message: number, parameters?: Partial<ForwardMessage>): Promise<Message | Error> {
    return this.telegram.api.post<ForwardMessage, Message>('forwardMessage', { chat_id: chat, from_chat_id: fromChat, message_id: message, ...parameters })
  }
}

export default Forward
