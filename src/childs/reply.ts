import { InlineKeyboardButton, Message, SendMessage } from '@queelag/telegram-types'
import Child from '../modules/child'

class Reply extends Child {
  async buttons(chat: number, text: string, data: object, buttons: InlineKeyboardButton[], parameters?: Partial<SendMessage>): Promise<Message | Error> {
    let message: Message | Error

    message = await this.telegram.send.message(chat, Buffer.from(JSON.stringify(data), 'utf8').toString('base64'))
    if (message instanceof Error) return message

    return this.telegram.send.buttons(chat, text, buttons, { reply_to_message_id: message.message_id, ...parameters })
  }
}

export default Reply
