import Child from '../modules/child'
import { PinChatMessage } from '@queelag/telegram-types'

class Pin extends Child {
  chatMessage(chat: number, message: number, parameters?: PinChatMessage): Promise<boolean | Error> {
    return this.telegram.api.post<PinChatMessage, boolean>('pinChatMessage', { chat_id: chat, message_id: message, ...parameters })
  }
}

export default Pin
