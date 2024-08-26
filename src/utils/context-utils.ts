import { getObjectProperty, hasObjectProperty } from '@aracna/core'
import type { Chat, User } from '@aracna/telegram-bot-types'
import type { Context } from '../definitions/interfaces'
import type { UpdateType } from '../definitions/types'

export function getContextChat<T extends UpdateType>(context: Context[T]): Chat | undefined {
  if (hasObjectProperty(context, 'chat')) {
    return getObjectProperty(context, 'chat')
  }

  if (hasObjectProperty(context, 'message.chat')) {
    return getObjectProperty(context, 'message.chat')
  }
}

export function getContextChatID<T extends UpdateType>(context: Context[T]): bigint | number | undefined {
  return getContextChat(context)?.id
}

export function getContextChatType<T extends UpdateType>(context: Context[T]): string | undefined {
  return getContextChat(context)?.type
}

export function getContextUser<T extends UpdateType>(context: Context[T]): User | undefined {
  if (hasObjectProperty(context, 'from')) {
    return getObjectProperty(context, 'from')
  }
}

export function getContextUserFirstName<T extends UpdateType>(context: Context[T]): string | undefined {
  return getContextUser(context)?.first_name
}

export function getContextUserID<T extends UpdateType>(context: Context[T]): bigint | number | undefined {
  return getContextUser(context)?.id
}

export function getContextUserLastName<T extends UpdateType>(context: Context[T]): string | undefined {
  return getContextUser(context)?.last_name
}

export function getContextUserUsername<T extends UpdateType>(context: Context[T]): string | undefined {
  return getContextUser(context)?.username
}
