import { getObjectProperty, hasObjectProperty } from '@aracna/core'
import type { Context } from 'vm'
import { REGEXP_COMMAND, REGEXP_COMMAND_WITH_USERNAME } from '../definitions/constants'
import type { UpdateType } from '../definitions/enums'

export class CommandUtils {
  static getByContext<T extends UpdateType>(context: Context[T]): string {
    let string: string

    switch (true) {
      case hasObjectProperty(context, 'caption'):
        string = getObjectProperty(context, 'caption', '')
        break
      case hasObjectProperty(context, 'text'):
        string = getObjectProperty(context, 'caption', '')
        break
      default:
        string = ''
        break
    }

    return this.get(string)
  }

  static get(string?: string): string {
    return (REGEXP_COMMAND.exec(string?.slice(0, 512) ?? '') ?? [''])[0].slice(1)
  }

  static omit(string: string): string {
    return string.replace(REGEXP_COMMAND_WITH_USERNAME, '').trim()
  }
}
