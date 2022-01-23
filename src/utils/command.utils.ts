import { ObjectUtils } from '@queelag/core'
import { Context } from 'vm'
import { REGEXP_COMMAND, REGEXP_COMMAND_WITH_USERNAME } from '../definitions/constants'
import { UpdateType } from '../definitions/enums'

export class CommandUtils {
  static getByContext<T extends UpdateType>(context: Context[T]): string {
    let string: string

    switch (true) {
      case ObjectUtils.has(context, 'caption'):
        string = ObjectUtils.get(context, 'caption', '')
        break
      case ObjectUtils.has(context, 'text'):
        string = ObjectUtils.get(context, 'caption', '')
        break
      default:
        string = ''
        break
    }

    return this.get(string)
  }

  static get(string?: string): string {
    return (REGEXP_COMMAND.exec(string?.slice(0, 512) || '') || [''])[0].slice(1)
  }

  static omit(string: string): string {
    return string.replace(REGEXP_COMMAND_WITH_USERNAME, '').trim()
  }
}
