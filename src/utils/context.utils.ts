import { getObjectProperty, hasObjectProperty } from '@aracna/core'
import { Chat, User } from '@aracna/telegram-bot-types'
import { UpdateType } from '../definitions/enums'
import { Context } from '../definitions/interfaces'

export class ContextUtils {
  static getChatID<T extends UpdateType>(context: Context[T]): number {
    return this.getChat(context).id
  }

  static getChatType<T extends UpdateType>(context: Context[T]): string {
    return this.getChat(context).type
  }

  static getChat<T extends UpdateType>(context: Context[T]): Chat {
    switch (true) {
      case hasObjectProperty(context, 'chat'):
        return getObjectProperty(context, 'chat', { id: 0, type: '' })
      case hasObjectProperty(context, 'message.chat'):
        return getObjectProperty(context, 'chat', { id: 0, type: '' })
      default:
        return { id: 0, type: '' }
    }
  }

  static getUserID<T extends UpdateType>(context: Context[T]): number {
    return this.getUser(context).id
  }

  static getUserFirstName<T extends UpdateType>(context: Context[T]): string {
    return this.getUser(context).first_name
  }

  static getUserLastName<T extends UpdateType>(context: Context[T]): string {
    return this.getUser(context).last_name ?? ''
  }

  static getUserUsername<T extends UpdateType>(context: Context[T]): string {
    return this.getUser(context).username ?? ''
  }

  static getUser<T extends UpdateType>(context: Context[T]): User {
    switch (true) {
      case hasObjectProperty(context, 'from'):
        return getObjectProperty(context, 'from', { first_name: '', id: 0, is_bot: false, username: '' })
      default:
        return { first_name: '', id: 0, is_bot: false, username: '' }
    }
  }
}
