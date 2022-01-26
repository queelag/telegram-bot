import { tc } from '@queelag/core'
import { MessageEntity } from '@queelag/telegram-types'
import { MessageBody } from '../definitions/interfaces'
import { Dummy } from '../modules/dummy'

export class ReplyToMessageUtils {
  static decodeBody<T>(entities: MessageEntity[]): MessageBody<T> {
    let entity: MessageEntity | undefined, encoded: string, body: MessageBody | Error

    entity = entities[entities.length - 1]
    if (!entity || !entity.url) return Dummy.messageBody

    encoded = entity.url.replace('https://t.me/?a=', '')
    console.log(entity.url, entity.url.replace('https://t.me/?a=', ''), encoded)

    body = tc(() => JSON.parse(Buffer.from(encoded, 'base64').toString()))
    console.log(body)
    if (body instanceof Error) return Dummy.messageBody

    return body
  }

  static encodeBody<T>(data: T, type: string, chatID?: number): string {
    let body: MessageBody

    body = Dummy.messageBody
    body.chatID = chatID
    body.data = data
    body.type = type

    return `<a href="https://t.me/?a=${Buffer.from(JSON.stringify(body)).toString('base64')}">_</a>`
  }
}
