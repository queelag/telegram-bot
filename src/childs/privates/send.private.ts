import { InlineKeyboardButton, Message, SendMessage } from '@queelag/telegram-types'
import Child from '../../modules/child'

class SendPrivate extends Child {
  async buttons(chats: [number, number], text: string, buttons: InlineKeyboardButton[], parameters?: Partial<SendMessage>): Promise<Message | Error> {
    return this.telegram.send.buttons(
      chats[1],
      text,
      buttons.map((v: InlineKeyboardButton) => this.telegram.builder.button.callback(v.text, v.callback_data, { c: chats[0] })),
      parameters
    )
  }
}

export default SendPrivate
