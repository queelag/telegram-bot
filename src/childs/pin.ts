import { PinChatMessage } from '@queelag/telegram-types'
import Child from '../modules/child'

class Pin extends Child {
  async chatMessage(chat: number, message: number, parameters?: Partial<PinChatMessage>): Promise<boolean | Error> {
    return this.telegram.api.post<PinChatMessage, boolean>('pinChatMessage', { chat_id: chat, message_id: message, ...parameters })
  }
}

export default Pin
