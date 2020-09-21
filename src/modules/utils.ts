import { CallbackQuery, Chat, InlineKeyboardButton, Message, User } from '@queelag/telegram-types'
import { has, reduce } from 'lodash'
import { Context } from '../definitions/types'
import Regex from './regex'

class Utils {
  parseStringParameters<T extends object>(string: string): T {
    return reduce(
      this.removeCommand(string).split(' '),
      (r: T, v: string) => {
        let splitted: string[], key: string, value: string

        splitted = v.split(':')
        key = splitted[0]
        value = splitted.slice(1).join(':')

        return { ...r, [key]: value }
      },
      {} as T
    )
  }

  removeCommand(string: string): string {
    return string.replace(Regex.command_with_username, '').trim()
  }

  findCommand(context: Context): string {
    let string: string

    switch (true) {
      case has(context, 'reply_to_message.text'):
        string = (context as Message).reply_to_message.text
        break
      case has(context, 'text'):
        string = (context as Message).text
        break
      case has(context, 'caption'):
        string = (context as Message).caption
        break
      case has(context, 'data'):
        string = (context as CallbackQuery).data
        break
      default:
        string = ''
        break
    }

    return (Regex.command.exec(string.substring(0, 512)) || [''])[0].substring(1)
  }

  findChatId(context: Context): number {
    return this.findChat(context).id
  }

  findPrivateChatId(context: Context): number {
    return this.findUserId(context)
  }

  findChatType(context: Context): string {
    return this.findChat(context).type
  }

  findChat(context: Context): Chat {
    switch (true) {
      case has(context, 'chat'):
        return (context as Message).chat
      case has(context, 'message.chat'):
        return (context as CallbackQuery).message.chat
      default:
        return { id: 0, type: '' }
    }
  }

  findUser(context: Context): User {
    switch (true) {
      case has(context, 'from'):
        return context.from
      default:
        return { id: 0, is_bot: false, first_name: '' }
    }
  }

  findUserId(context: Context): number {
    return this.findUser(context).id
  }

  findUsername(context: Context): string {
    return this.findUser(context).username
  }

  findText(context: Context): string {
    switch (true) {
      case has(context, 'text'):
        return (context as Message).text
      case has(context, 'caption'):
        return (context as Message).caption
      case has(context, 'data'):
        return (context as CallbackQuery).data
      default:
        return ''
    }
  }

  fakeChat(id: number, type: string, fields?: Partial<Chat>): Chat {
    return { id: id, type: type, ...fields }
  }

  fakeUser(id: number, isBot: boolean, firstName: string, fields?: Partial<User>): User {
    return { id: id, is_bot: isBot, first_name: firstName, ...fields }
  }

  fakeContext(chat: number = 0, username: string = ''): Message {
    return { message_id: 0, date: 0, chat: this.fakeChat(chat, ''), from: this.fakeUser(0, false, '', { username: username }) }
  }

  findButtonsType(buttons: InlineKeyboardButton[]): string {
    switch (Object.keys(buttons).filter((v: string) => v !== 'text')[0]) {
      case 'url':
        return 'url'
      case 'login_url':
        return 'login'
      case 'callback_data':
        return 'callback'
      case 'switch_inline_query':
        return 'query'
      case 'switch_inline_query_current_chat':
        return 'queryCurrentChat'
      case 'callback_game':
        return 'game'
      case 'pay':
        return 'pay'
      default:
        return ''
    }
  }
}

export default Utils
