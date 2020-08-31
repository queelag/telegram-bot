import Child from '../modules/child'
import { Update, Message, CallbackQuery } from '@queelag/telegram-types'
import Regex from '../modules/regex'
import { has, reduce } from 'lodash'
import { Context } from '../definitions/types'

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

    return (Regex.command.exec(string) || [''])[0].substring(1)
  }

  findChatId(context: Context): number {
    switch (true) {
      case has(context, 'chat.id'):
        return (context as Message).chat.id
      case has(context, 'message.chat.id'):
        return (context as CallbackQuery).message.chat.id
      default:
        return 0
    }
  }

  findUsername(context: Context): string {
    switch (true) {
      case has(context, 'from.username'):
        return context.from.username
      default:
        return ''
    }
  }
}

export default Utils
