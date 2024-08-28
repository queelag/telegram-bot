import { appendSearchParamsToURL, decodeBase64, decodeJSON, decodeText, encodeBase64, encodeJSON, encodeText, tc } from '@aracna/core'
import type { MessageEntity } from '@aracna/telegram-bot-types'
import { DEFAULT_DECODE_JSON_OPTIONS, DEFAULT_ENCODE_JSON_OPTIONS, DEFAULT_REPLY_TO_MESSAGE_BODY } from '../definitions/constants'
import type { EncodeReplyToMessageBodyOptions, ReplyToMessageBody } from '../definitions/interfaces'

export function decodeReplyToMessageBody<T>(entities: MessageEntity[]): ReplyToMessageBody<T> {
  let entity: MessageEntity | undefined, encoded: string | null, body: ReplyToMessageBody<T> | Error

  entity = entities[entities.length - 1]
  if (!entity?.url) return DEFAULT_REPLY_TO_MESSAGE_BODY()

  encoded = new URL(entity.url).searchParams.get('a')
  if (!encoded) return DEFAULT_REPLY_TO_MESSAGE_BODY()

  body = tc(() => decodeJSON(decodeText(decodeBase64(encoded)), DEFAULT_DECODE_JSON_OPTIONS()))
  if (body instanceof Error) return DEFAULT_REPLY_TO_MESSAGE_BODY()

  return body
}

export function encodeReplyToMessageBody<T>(options?: EncodeReplyToMessageBodyOptions<T>): string {
  let body: ReplyToMessageBody

  body = {
    c: options?.chatID,
    d: options?.data,
    m: options?.command
  }

  return encodeBase64(encodeText(encodeJSON(body, DEFAULT_ENCODE_JSON_OPTIONS(), '{}')))
}

export function encodeReplyToMessageBodyToAnchorTag<T>(options?: EncodeReplyToMessageBodyOptions<T>): string {
  return `<a href="${encodeReplyToMessageBodyToURL(options)}"> </a>`
}

export function encodeReplyToMessageBodyToURL<T>(options?: EncodeReplyToMessageBodyOptions<T>): string {
  return appendSearchParamsToURL('https://t.me', { a: encodeReplyToMessageBody(options) })
}
