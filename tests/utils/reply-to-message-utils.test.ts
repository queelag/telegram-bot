import { generateRandomString } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { ReplyToMessageBody } from '../../src/definitions/interfaces'
import { decodeReplyToMessageBody, encodeReplyToMessageBodyToURL } from '../../src/utils/reply-to-message-utils'

describe('Reply To Message Utils', () => {
  it('encodes and decodes without chat_id', () => {
    let body: ReplyToMessageBody, url: string, decoded: any

    body = {
      d: generateRandomString(),
      m: generateRandomString()
    }

    url = encodeReplyToMessageBodyToURL({ command: body.m, data: body.d })
    decoded = decodeReplyToMessageBody([{ length: 0, offset: 0, type: '', url }])

    expect(decoded).toStrictEqual(body)
  })

  it('encodes and decodes with 32 bit chat_id', () => {
    let body: ReplyToMessageBody, url: string, decoded: any

    body = {
      c: 0,
      d: generateRandomString(),
      m: generateRandomString()
    }

    url = encodeReplyToMessageBodyToURL({ chatID: body.c, command: body.m, data: body.d })
    decoded = decodeReplyToMessageBody([{ length: 0, offset: 0, type: '', url }])

    expect(decoded).toStrictEqual(body)
  })

  it('encodes and decodes with 64 bit chat_id', () => {
    let body: ReplyToMessageBody, url: string, decoded: any

    body = {
      c: BigInt(Number.MAX_SAFE_INTEGER) + 1n,
      d: generateRandomString(),
      m: generateRandomString()
    }

    url = encodeReplyToMessageBodyToURL({ chatID: body.c, command: body.m, data: body.d })
    decoded = decodeReplyToMessageBody([{ length: 0, offset: 0, type: '', url }])

    expect(decoded).toStrictEqual(body)
  })
})
