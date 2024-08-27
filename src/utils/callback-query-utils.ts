import { decodeBase64, decodeJSON, decodeText, encodeBase64, encodeJSON, encodeText, tc } from '@aracna/core'
import { DEFAULT_CALLBACK_QUERY_BODY, DEFAULT_DECODE_JSON_OPTIONS, DEFAULT_ENCODE_JSON_OPTIONS } from '../definitions/constants'
import type { CallbackQueryBody, EncodeCallbackQueryBodyOptions } from '../definitions/interfaces'

export function decodeCallbackQueryBody<T>(data?: string): CallbackQueryBody<T> {
  let body: CallbackQueryBody<T> | Error

  if (!data) {
    return DEFAULT_CALLBACK_QUERY_BODY()
  }

  body = tc(() => decodeJSON(decodeText(decodeBase64(data)), DEFAULT_DECODE_JSON_OPTIONS()))
  if (body instanceof Error) return DEFAULT_CALLBACK_QUERY_BODY()

  return body
}

export function encodeCallbackQueryBody<T>(options?: EncodeCallbackQueryBodyOptions<T>): string {
  let body: CallbackQueryBody<T>

  body = {
    c: options?.chatID,
    d: options?.data,
    m: options?.command
  }

  return encodeBase64(encodeText(encodeJSON(body, DEFAULT_ENCODE_JSON_OPTIONS(), '{}')))
}
