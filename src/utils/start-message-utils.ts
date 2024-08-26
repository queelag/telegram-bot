import { appendSearchParamsToURL, decodeBase64, decodeText, encodeBase64, encodeText, parseBigIntJSON, stringifyBigIntJSON, tc } from '@aracna/core'
import { DEFAULT_MESSAGE_BODY } from '../definitions/constants'
import type { MessageBody } from '../definitions/interfaces'

export function decodeStartMessageBody<T>(text?: string): MessageBody<T> {
  let body: MessageBody | Error

  if (!text) {
    return DEFAULT_MESSAGE_BODY()
  }

  body = tc(() => parseBigIntJSON(decodeText(decodeBase64(text)).replace('/start', '').trim()))
  if (body instanceof Error) return DEFAULT_MESSAGE_BODY()

  return body
}

export function encodeStartMessageBody<T>(data: T, type: string, chatID?: bigint | number): string {
  let body: MessageBody

  body = {
    c: chatID,
    d: data,
    t: type
  }

  return encodeBase64(encodeText(stringifyBigIntJSON(body)))
}

export function encodeStartMessageBodyToURL<T>(username: string, data: T, type: string, chatID?: bigint | number): URL {
  return appendSearchParamsToURL(new URL(username, 'https://t.me/'), { start: encodeStartMessageBody(data, type, chatID) })
}

export function encodeStartMessageBodyToAnchorTag<T>(username: string, data: T, type: string, children: string, chatID?: bigint | number): string {
  return `<a href="${encodeStartMessageBodyToURL(username, data, type, chatID)}">${children}</a>`
}
