import type { FetchError } from '@aracna/core'
import type { InlineKeyboardButton, Message, SendMessage } from '@aracna/telegram-bot-types'
import type { CallbackQueryBody, SendRepliable } from '../../definitions/interfaces'
import { Child } from '../../modules/child'
import { CallbackQueryUtils } from '../../utils/callback-query-utils'

export class SendPrivate extends Child {
  async buttons(
    chatIDs: [bigint, bigint],
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

  async repliable<T>(
    chatIDs: [bigint, bigint],
    data: T,
    parameters: Omit<SendRepliable, 'chat_id' | 'data' | 'from_chat_id'>
  ): Promise<Message | FetchError | Error> {
    return this.telegram.send.repliable(chatIDs[1], data, { from_chat_id: chatIDs[0], ...parameters })
  }
}
