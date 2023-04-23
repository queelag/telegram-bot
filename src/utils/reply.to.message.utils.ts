import { tc } from '@aracna/core'
import { MessageEntity } from '@aracna/telegram-bot-types'
import { MessageBody } from '../definitions/interfaces'
import { Dummy } from '../modules/dummy'

export class ReplyToMessageUtils {
  static decodeBody<T>(entities: MessageEntity[]): MessageBody<T> {
    let entity: MessageEntity | undefined, encoded: string, body: MessageBody | Error

    entity = entities[entities.length - 1]
    if (!entity || !entity.url) return Dummy.messageBody

    encoded = entity.url.replace('https://t.me/?a=', '')

    body = tc(() => JSON.parse(Buffer.from(encoded, 'base64').toString()))
    if (body instanceof Error) return Dummy.messageBody

    return body
  }

  static encodeBody<T>(data: T, type: string, chatID?: number): string {
    let body: MessageBody

    body = Dummy.messageBody
    body.chatID = chatID
    body.data = data
    body.type = type

    return `\n<a href="https://t.me/?a=${Buffer.from(JSON.stringify(body)).toString('base64')}">ㅤ</a>`
  }
}
