import { getObjectProperty, hasObjectProperty } from '@aracna/core'
import { MAX_COMMAND_LENGTH, REGEXP_COMMAND, REGEXP_COMMAND_WITH_USERNAME } from '../definitions/constants.js'
import type { Context } from '../definitions/interfaces.js'
import type { UpdateType } from '../definitions/types.js'

export function getCommandByContext<T extends UpdateType>(context: Context[T]): string | undefined {
  let string: string | undefined

  switch (true) {
    case hasObjectProperty(context, 'caption'):
      string = getObjectProperty(context, 'caption', '')
      break
    case hasObjectProperty(context, 'text'):
      string = getObjectProperty(context, 'text', '')
      break
    default:
      break
  }

  return getCommand(string)
}

export function getCommand(string: string | undefined): string | undefined {
  if (typeof string !== 'string') {
    return
  }

  // biome-ignore lint/suspicious/noUnnecessaryConditions: not unnecessary
  return REGEXP_COMMAND.exec(string.slice(0, MAX_COMMAND_LENGTH))?.[0].slice(1)
}

export function omitCommand(string: string | undefined): string {
  return string?.replace(REGEXP_COMMAND_WITH_USERNAME, '').trim() ?? ''
}
