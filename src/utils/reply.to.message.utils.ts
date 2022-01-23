import { tc } from '@queelag/core'
import { MessageBody } from '../definitions/interfaces'
import { Dummy } from '../modules/dummy'

export class ReplyToMessageUtils {
  static decodeBody<T>(text?: string): MessageBody<T> {
    let body: MessageBody | Error

    if (!text) {
      return Dummy.messageBody
    }

    body = tc(() => JSON.parse(Buffer.from(((text as string).match(/<spoiler>[^<>]+<\/spoiler>\z/m) || [''])[0], 'base64').toString()))
    if (body instanceof Error) return Dummy.messageBody

    return body
  }

  static encodeBody<T>(data: T, type: string, chatID: number = 0): string {
    let body: MessageBody

    body = Dummy.messageBody
    body.chatID = chatID
    body.data = data
    body.type = type

    return `<spoiler>${Buffer.from(JSON.stringify(body)).toString('base64')}</spoiler>`
  }
}
