import { Message, CallbackQuery, Chat, User } from '@queelag/telegram-types'
import Regex from './regex'
import { has, reduce } from 'lodash'
import { Context } from '../definitions/types'
import Child from './child'

class Utils extends Child {
  parseStringParameters<T extends object>(string: string): T {
    return reduce(
      this.removeCommand(string).split(' '),
      (r: T, v: string) => {
        let splitted: string[], key: string, value: string

        splitted = v.split(':')
        key = splitted[0]
        value = splitted[1]

        return { ...r, [key]: value }
      },
      {} as T
    )
  }

  removeCommand(string: string): string {
    return string.replace(Regex.command, '').trim()
  }

  findCommand(context: Context): string {
    let string: string

    switch (true) {
      case has(context, 'caption'):
        string = (context as Message).caption
        break
      case has(context, 'reply_to_message.text'):
        string = (context as Message).reply_to_message.text
        break
      case has(context, 'text'):
        string = (context as Message).text
        break
      case has(context, 'data'):
        string = (context as CallbackQuery).data
        break
      default:
        string = ''
        break
    }

    return (Regex.command.exec(string.substring(0, 256)) || [''])[0].substring(1)
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
        return { id: 0, is_bot: false, first_name: '', username: '' }
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

  fakeContext(chat: number = 0, username: string = ''): Message {
    return { message_id: 0, date: 0, chat: { id: chat, type: '' }, from: { id: 0, is_bot: false, first_name: '', username: username } }
  }
}

export default Utils
