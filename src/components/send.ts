import Component from '../modules/component'
import { Message, InlineKeyboardButton, SendMessage, SendPhoto, SendDocument } from '@queelag/telegram-types'
import HTML from '../modules/html'

class Send extends Component {
  message(chatId: number, text: string, parameters?: SendMessage): Promise<Message | Error> {
    return this.telegram.api.post<SendMessage, Message>('sendMessage', {
      chat_id: chatId,
      text: text.substring(0, 4096),
      ...parameters
    })
  }

  html(chatId: number, text: string, parameters?: SendMessage): Promise<Message | Error> {
    return this.telegram.api.post<SendMessage, Message>('sendMessage', {
      chat_id: chatId,
      text: HTML.sanitize(text.substring(0, 4096)),
      parse_mode: 'HTML',
      ...parameters
    })
  }

  buttons(chatId: number, text: string, buttons: InlineKeyboardButton[], parameters?: SendMessage): Promise<Message | Error> {
    return this.message(chatId, text, {
      reply_markup: {
        inline_keyboard: [buttons]
      },
      ...parameters
    })
  }

  prompt(chatId: number, text: string, parameters?: SendMessage): Promise<Message | Error> {
    return this.message(chatId, text, {
      reply_markup: {
        force_reply: true,
        selective: true
      },
      ...parameters
    })
  }

  photo(chatId: number, photo: Buffer, parameters?: SendPhoto): Promise<Message | Error> {
    return this.telegram.api.post<SendPhoto, Message>('sendPhoto', {
      chat_id: chatId,
      photo: photo,
      ...parameters
    })
  }

  document(chatId: number, document: Buffer, parameters?: SendDocument): Promise<Message | Error> {
    return this.telegram.api.post<SendDocument, Message>('sendDocument', {
      chat_id: chatId,
      document: document,
      ...parameters
    })
  }
}

export default Send
