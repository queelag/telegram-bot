import { tc } from '@queelag/core'
import { MessageBody } from '../definitions/interfaces'
import { Dummy } from '../modules/dummy'

export class ReplyToMessageUtils {
  static decodeBody<T>(text?: string): MessageBody<T> {
    let body: MessageBody | Error, match: RegExpMatchArray | null, href: string

    if (!text) {
      return Dummy.messageBody
    }

    match = text.match(/<a>[^<>]+<\/a>\z/m)
    if (!match) return Dummy.messageBody

    href = match[0].replace('<a href="', '').replace('"></a>', '')
    if (!href) return Dummy.messageBody

    body = tc(() => JSON.parse(Buffer.from(href, 'base64').toString()))
    if (body instanceof Error) return Dummy.messageBody

    return body
  }

  static encodeBody<T>(data: T, type: string, chatID: number = 0): string {
    let body: MessageBody

    body = Dummy.messageBody
    body.chatID = chatID
    body.data = data
    body.type = type

    return `<a href="${Buffer.from(JSON.stringify(body)).toString('base64')}"></a>`
  }
}
