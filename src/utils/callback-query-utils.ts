import { tc } from '@aracna/core'
import { DEFAULT_CALLBACK_QUERY_BODY } from '../definitions/constants'
import type { CallbackQueryBody } from '../definitions/interfaces'

export function decodeCallbackQueryBody<T>(data?: string): CallbackQueryBody<T> {
  let body: CallbackQueryBody | Error

  if (!data) {
    return DEFAULT_CALLBACK_QUERY_BODY()
  }

  body = tc(() => JSON.parse(Buffer.from(data, 'base64').toString()))
  if (body instanceof Error) return DEFAULT_CALLBACK_QUERY_BODY()

  return body
}

export function encodeCallbackQueryBody<T>(data: T, type: string, chatID?: bigint): string {
  let body: CallbackQueryBody

  body = {
    c: chatID,
    d: data,
    t: type
  }

  return Buffer.from(JSON.stringify(body)).toString('base64')
}
