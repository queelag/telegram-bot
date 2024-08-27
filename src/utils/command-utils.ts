import { getObjectProperty, hasObjectProperty } from '@aracna/core'
import type { Context } from 'vm'
import { REGEXP_COMMAND, REGEXP_COMMAND_WITH_USERNAME } from '../definitions/constants'
import type { UpdateType } from '../definitions/types'

export function getCommandByContext<T extends UpdateType>(context: Context[T]): string | undefined {
  let string: string | undefined

  switch (true) {
    case hasObjectProperty(context, 'caption'):
      string = getObjectProperty(context, 'caption', '')
      break
    case hasObjectProperty(context, 'text'):
      string = getObjectProperty(context, 'text', '')
      break
  }

  return getCommand(string)
}

export function getCommand(string: string | undefined): string | undefined {
  if (typeof string !== 'string') {
    return
  }

  return REGEXP_COMMAND.exec(string.slice(0, 512))?.[0].slice(1)
}

export function omitCommand(string: string | undefined): string | undefined {
  return string?.replace(REGEXP_COMMAND_WITH_USERNAME, '').trim()
}
