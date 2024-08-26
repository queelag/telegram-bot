import { decodeBase64, decodeText, encodeBase64, encodeText, parseBigIntJSON, stringifyBigIntJSON, tc } from '@aracna/core'
import { DEFAULT_CALLBACK_QUERY_BODY } from '../definitions/constants'
import type { CallbackQueryBody } from '../definitions/interfaces'

export function decodeCallbackQueryBody<T>(data?: string): CallbackQueryBody<T> {
  let body: CallbackQueryBody | Error

  if (!data) {
    return DEFAULT_CALLBACK_QUERY_BODY()
  }

  body = tc(() => parseBigIntJSON(decodeText(decodeBase64(data))))
  if (body instanceof Error) return DEFAULT_CALLBACK_QUERY_BODY()

  return body
}

export function encodeCallbackQueryBody<T>(data: T, type: string, chatID?: bigint | number): string {
  let body: CallbackQueryBody

  body = {
    c: chatID,
    d: data,
    t: type
  }

  return encodeBase64(encodeText(stringifyBigIntJSON(body)))
}
