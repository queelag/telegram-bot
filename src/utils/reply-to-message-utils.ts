import { decodeBase64, decodeText, encodeBase64, encodeText, parseBigIntJSON, stringifyBigIntJSON, tc } from '@aracna/core'
import type { MessageEntity } from '@aracna/telegram-bot-types'
import { DEFAULT_MESSAGE_BODY } from '../definitions/constants'
import type { MessageBody } from '../definitions/interfaces'

export function decodeReplyToMessageBody<T>(entities: MessageEntity[]): MessageBody<T> {
  let entity: MessageEntity | undefined, encoded: string, body: MessageBody | Error

  entity = entities[entities.length - 1]
  if (!entity?.url) return DEFAULT_MESSAGE_BODY()

  encoded = entity.url.replace('https://t.me/?a=', '')

  body = tc(() => parseBigIntJSON(decodeText(decodeBase64(encoded))))
  if (body instanceof Error) return DEFAULT_MESSAGE_BODY()

  return body
}

export function encodeReplyToMessageBody<T>(data: T, type: string, chatID?: bigint | number): string {
  let body: MessageBody

  body = {
    c: chatID,
    d: data,
    t: type
  }

  return `\n<a href="https://t.me/?a=${encodeBase64(encodeText(stringifyBigIntJSON(body)))}">ㅤ</a>`
}
