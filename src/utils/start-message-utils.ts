import { appendSearchParamsToURL, decodeBase64, decodeJSON, decodeText, encodeBase64, encodeJSON, encodeText, tc } from '@aracna/core'
import { DEFAULT_DECODE_JSON_OPTIONS, DEFAULT_ENCODE_JSON_OPTIONS, DEFAULT_START_MESSAGE_BODY } from '../definitions/constants'
import type { EncodeStartBodyOptions, StartBody } from '../definitions/interfaces'

export function decodeStartBody<T>(text: string | undefined): StartBody<T> {
  let encoded: string, body: StartBody<T> | Error

  if (!text) {
    return DEFAULT_START_MESSAGE_BODY()
  }

  encoded = text.replace('/start', '').trim()
  if (encoded.length <= 0) return DEFAULT_START_MESSAGE_BODY()

  body = tc(() => decodeJSON(decodeText(decodeBase64(encoded)), DEFAULT_DECODE_JSON_OPTIONS()))
  if (body instanceof Error) return DEFAULT_START_MESSAGE_BODY()

  return body
}

export function encodeStartBody<T>(options?: EncodeStartBodyOptions): string {
  let body: StartBody<T>

  body = {
    c: options?.chatID,
    d: options?.data,
    m: options?.command
  }

  return encodeBase64(encodeText(encodeJSON(body, DEFAULT_ENCODE_JSON_OPTIONS(), '{}')))
}

export function encodeStartBodyToAnchorTag<T>(username: string, children: string, options?: EncodeStartBodyOptions<T>): string {
  return `<a href="${encodeStartBodyToURL(username, options)}">${children}</a>`
}

export function encodeStartBodyToText<T>(options?: EncodeStartBodyOptions<T>): string {
  return `/start ${encodeStartBody(options)}`
}

export function encodeStartBodyToURL<T>(username: string, options?: EncodeStartBodyOptions<T>): string {
  return appendSearchParamsToURL(`https://t.me/${username}`, { start: encodeStartBody(options) })
}
