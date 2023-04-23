import { tc } from '@aracna/core'
import { CallbackQueryBody } from '../definitions/interfaces'
import { Dummy } from '../modules/dummy'

export class CallbackQueryUtils {
  static decodeBody<T>(data?: string): CallbackQueryBody<T> {
    let body: CallbackQueryBody | Error

    if (!data) {
      return Dummy.callbackQueryBody
    }

    body = tc(() => JSON.parse(Buffer.from(data, 'base64').toString()))
    if (body instanceof Error) return Dummy.callbackQueryBody

    return body
  }

  static encodeBody<T>(data: T, type: string, chatID?: number): string {
    let body: CallbackQueryBody

    body = Dummy.callbackQueryBody
    body.c = chatID
    body.d = data
    body.t = type

    return Buffer.from(JSON.stringify(body)).toString('base64')
  }
}
