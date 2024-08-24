import { tc } from '@aracna/core'
import type { MessageBody } from '../definitions/interfaces'
import { Dummy } from '../modules/dummy'

export class StartUtils {
  static decodeBody<T>(text?: string): MessageBody<T> {
    let body: MessageBody | Error

    if (!text) {
      return Dummy.messageBody
    }

    body = tc(() => JSON.parse(Buffer.from(text.replace('/start', '').trim(), 'base64').toString()))
    if (body instanceof Error) return Dummy.messageBody

    return body
  }

  static encodeBody<T>(data: T, type: string, chatID?: bigint): string {
    let body: MessageBody

    body = Dummy.messageBody
    body.chatID = chatID
    body.data = data
    body.type = type

    return Buffer.from(JSON.stringify(body)).toString('base64')
  }

  static encodeBodyToHREF<T>(username: string, data: T, type: string, chatID?: bigint): string {
    return `https://t.me/${username}?start=${this.encodeBody(data, type, chatID)}`
  }

  static encodeBodyToAnchorTag<T>(username: string, data: T, type: string, children: string, chatID?: bigint): string {
    return `<a href="${this.encodeBodyToHREF(username, data, type, chatID)}">${children}</a>`
  }
}
