import { getObjectProperty, hasObjectProperty } from '@aracna/core'
import type { Chat, User } from '@aracna/telegram-bot-types'
import type { Context } from '../definitions/interfaces'
import type { UpdateType } from '../definitions/types'

export function getContextChatID<T extends UpdateType>(context: Context[T]): bigint | number {
  return getContextChat(context).id
}

export function getContextChatType<T extends UpdateType>(context: Context[T]): string {
  return getContextChat(context).type
}

export function getContextChat<T extends UpdateType>(context: Context[T]): Chat {
  switch (true) {
    case hasObjectProperty(context, 'chat'):
      return getObjectProperty(context, 'chat', { id: 0n, type: '' })
    case hasObjectProperty(context, 'message.chat'):
      return getObjectProperty(context, 'chat', { id: 0n, type: '' })
    default:
      return { id: 0n, type: '' }
  }
}

export function getContextUserID<T extends UpdateType>(context: Context[T]): bigint | number {
  return getContextUser(context).id
}

export function getContextUserFirstName<T extends UpdateType>(context: Context[T]): string {
  return getContextUser(context).first_name
}

export function getContextUserLastName<T extends UpdateType>(context: Context[T]): string {
  return getContextUser(context).last_name ?? ''
}

export function getContextUserUsername<T extends UpdateType>(context: Context[T]): string {
  return getContextUser(context).username ?? ''
}

export function getContextUser<T extends UpdateType>(context: Context[T]): User {
  if (hasObjectProperty(context, 'from')) {
    return getObjectProperty(context, 'from', { first_name: '', id: 0n, is_bot: false, username: '' })
  }

  return { first_name: '', id: 0n, is_bot: false, username: '' }
}
