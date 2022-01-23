import { FetchError } from '@queelag/core'
import { InlineKeyboardButton, Message, SendMessage } from '@queelag/telegram-types'
import { CallbackQueryBody } from '../../definitions/interfaces'
import { Child } from '../../modules/child'
import { CallbackQueryUtils } from '../../utils/callback.query.utils'

export class SendPrivate extends Child {
  async buttons(
    chatIDs: [number, number],
    text: string,
    buttons: InlineKeyboardButton[],
    parameters?: Partial<SendMessage>
  ): Promise<Message | FetchError | Error> {
    return this.telegram.send.buttons(
      chatIDs[1],
      text,
      buttons.map((v: InlineKeyboardButton) => {
        let decoded: CallbackQueryBody

        decoded = CallbackQueryUtils.decodeBody(v.callback_data)
        decoded.c = chatIDs[0]

        return this.telegram.builder.button.callback(v.text, decoded.d, decoded.t, decoded.c)
      }),
      parameters
    )
  }

  async repliable<T>(chatIDs: [number, number], text: string, data: T, type: string, parameters?: Partial<SendMessage>): Promise<Message | FetchError | Error> {
    return this.telegram.send.repliable(chatIDs[1], text, data, type, parameters, chatIDs[0])
  }
}
