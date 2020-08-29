import Component from '../modules/component'
import { Message } from 'telegram-typings'
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
}

export default Send
