import Component from '../modules/component'
import { Message, InlineKeyboardButton } from 'telegram-typings'
import HTML from '../modules/html'

class Send extends Component {
  message(chatId: number, text: string): Promise<Message | Error> {
    return this.telegram.api.post<any, Message>('sendMessage', { chat_id: chatId, text: text.substring(0, 4096) })
  }

  html(chatId: string, text: string): Promise<Message | Error> {
    return this.telegram.api.post<any, Message>('sendMessage', {
      chat_id: chatId,
      text: HTML.sanitize(text.substring(0, 4096)),
      parse_mode: 'HTML'
    })
  }

  buttons(chatId: string, text: string, buttons: InlineKeyboardButton[]): Promise<Message | Error> {
    return this.telegram.api.post<any, Message>('sendMessage', {
      chat_id: chatId,
      text: text.substring(0, 4096),
      reply_markup: {
        inline_keyboard: [buttons]
      }
    })
  }

  prompt(chatId: string, text: string): Promise<Message | Error> {
    return this.telegram.api.post<any, Message>('sendMessage', {
      chat_id: chatId,
      text: text.substring(0, 4096),
      reply_markup: {
        force_reply: true,
        selective: true
      }
    })
  }

  photo(chatId: string, photo: Buffer): Promise<Message | Error> {
    return this.telegram.api.post<any, Message>('sendPhoto', {
      chat_id: chatId,
      photo: photo
    })
  }

  document(chatId: string, document: Buffer): Promise<Message | Error> {
    return this.telegram.api.post<any, Message>('sendDocument', {
      chat_id: chatId,
      document: document
    })
  }
}

export default Send
