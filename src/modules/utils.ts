import { NumberUtils, ObjectUtils } from '@queelag/core'
import { CallbackQuery, Chat, InlineKeyboardButton, Message, User } from '@queelag/telegram-types'
import { UpdateType } from '../definitions/enums'
import { Context } from '../definitions/interfaces'
import { Regex } from './regex'

export class Utils {
  parseStringParameters<T extends object>(string: string): T {
    return this.removeCommand(string)
      .split(' ')
      .reduce((r: T, v: string) => {
        let splitted: string[], key: string, value: any

        splitted = v.split(':')
        key = splitted[0]
        value = splitted.slice(1).join(':')

        return { ...r, [key]: value }
      }, {} as T)
  }

  toStringParameters<T extends object>(parameters: T = {} as T): string {
    return Object.entries(parameters)
      .reduce((r: string[], [k, v]: [string, any]) => [...r, `${k}:${v}`], [])
      .join(' ')
  }

  toCallbackData<T extends object>(command: string, parameters?: T): string {
    return '/' + command + ' ' + this.toStringParameters(parameters)
  }

  findCommand(string: string): string {
    return (Regex.command.exec(string.substring(0, 512)) || [''])[0].substring(1)
  }

  removeCommand(string: string): string {
    return string.replace(Regex.command_with_username, '').trim()
  }

  findCommandByContext<T extends UpdateType>(context: Context[T]): string {
    let string: string

    switch (true) {
      case ObjectUtils.has(context, 'caption'):
        string = (context as Message).caption
        break
      case ObjectUtils.has(context, 'data'):
        string = (context as CallbackQuery).data
        break
      case ObjectUtils.has(context, 'reply_to_message.text'):
        string = (context as Message).reply_to_message.text
        break
      case ObjectUtils.has(context, 'text'):
        string = (context as Message).text
        break
      default:
        string = ''
        break
    }

    return this.findCommand(string)
  }

  findChatId<T extends UpdateType>(context: Context[T]): number {
    return this.findChat(context).id
  }

  findPrivateChatId<T extends UpdateType>(context: Context[T]): number {
    return this.findUserId(context)
  }

  findCallbackQueryChatId(context: CallbackQuery): number {
    return NumberUtils.parseInt(ObjectUtils.get(this.parseStringParameters(context.data), 'c', context.message.chat.id))
  }

  findReplyToMessageChatId(context: Message): number {
    let exec: RegExpExecArray

    exec = Regex.repliable_chat_id.exec(context.reply_to_message.text)
    if (!exec) return context.chat.id

    return NumberUtils.parseInt(exec[0].replace(':', '')) || context.chat.id
  }

  findChatType<T extends UpdateType>(context: Context[T]): string {
    return this.findChat(context).type
  }

  findChat<T extends UpdateType>(context: Context[T]): Chat {
    switch (true) {
      case ObjectUtils.has(context, 'chat'):
        return (context as Message).chat
      case ObjectUtils.has(context, 'message.chat'):
        return (context as CallbackQuery).message.chat
      default:
        return { id: 0, type: '' }
    }
  }

  findUser<T extends UpdateType>(context: Context[T]): User {
    switch (true) {
      case ObjectUtils.has(context, 'from'):
        return (context as Message).from
      default:
        return { id: 0, is_bot: false, first_name: '', username: '' }
    }
  }

  findUserId<T extends UpdateType>(context: Context[T]): number {
    return this.findUser(context).id
  }

  findUserFirstName<T extends UpdateType>(context: Context[T]): string {
    return this.findUser(context).first_name
  }

  findUsername<T extends UpdateType>(context: Context[T]): string {
    return this.findUser(context).username
  }

  findText<T extends UpdateType>(context: Context[T]): string {
    switch (true) {
      case ObjectUtils.has(context, 'caption'):
        return (context as Message).caption
      case ObjectUtils.has(context, 'data'):
        return (context as CallbackQuery).data
      case ObjectUtils.has(context, 'text'):
        return (context as Message).text
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

  fakeContext(chat: number = 0, user: number = 0): Message {
    return { message_id: 0, date: 0, chat: this.fakeChat(chat, ''), from: this.fakeUser(user, false, '') }
  }

  findButtonsType(buttons: InlineKeyboardButton[]): string {
    switch (Object.keys(buttons[0]).filter((v: string) => v !== 'text')[0]) {
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
