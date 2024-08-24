import { getObjectProperty, hasObjectProperty } from '@aracna/core'
import type { Chat, User } from '@aracna/telegram-bot-types'
import type { UpdateType } from '../definitions/enums'
import type { Context } from '../definitions/interfaces'

export class ContextUtils {
  static getChatID<T extends UpdateType>(context: Context[T]): bigint {
    return this.getChat(context).id
  }

  static getChatType<T extends UpdateType>(context: Context[T]): string {
    return this.getChat(context).type
  }

  static getChat<T extends UpdateType>(context: Context[T]): Chat {
    switch (true) {
      case hasObjectProperty(context, 'chat'):
        return getObjectProperty(context, 'chat', { id: 0n, type: '' })
      case hasObjectProperty(context, 'message.chat'):
        return getObjectProperty(context, 'chat', { id: 0n, type: '' })
      default:
        return { id: 0n, type: '' }
    }
  }

  static getUserID<T extends UpdateType>(context: Context[T]): bigint {
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
    if (hasObjectProperty(context, 'from')) {
      return getObjectProperty(context, 'from', { first_name: '', id: 0n, is_bot: false, username: '' })
    }

    return { first_name: '', id: 0n, is_bot: false, username: '' }
  }
}
