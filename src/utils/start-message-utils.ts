import { appendSearchParamsToURL, tc } from '@aracna/core'
import { DEFAULT_MESSAGE_BODY } from '../definitions/constants'
import type { MessageBody } from '../definitions/interfaces'

export function decodeStartMessageBody<T>(text?: string): MessageBody<T> {
  let body: MessageBody | Error

  if (!text) {
    return DEFAULT_MESSAGE_BODY()
  }

  body = tc(() => JSON.parse(Buffer.from(text.replace('/start', '').trim(), 'base64').toString()))
  if (body instanceof Error) return DEFAULT_MESSAGE_BODY()

  return body
}

export function encodeStartMessageBody<T>(data: T, type: string, chatID?: bigint): string {
  let body: MessageBody

  body = {
    chatID: chatID,
    data: data,
    type: type
  }

  return Buffer.from(JSON.stringify(body)).toString('base64')
}

export function encodeStartMessageBodyToURL<T>(username: string, data: T, type: string, chatID?: bigint): URL {
  return appendSearchParamsToURL(new URL(username, 'https://t.me/'), { start: encodeStartMessageBody(data, type, chatID) })
}

export function encodeStartMessageBodyToAnchorTag<T>(username: string, data: T, type: string, children: string, chatID?: bigint): string {
  return `<a href="${encodeStartMessageBodyToURL(username, data, type, chatID)}">${children}</a>`
}
