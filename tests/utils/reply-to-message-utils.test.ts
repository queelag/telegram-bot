import { generateRandomString } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { MessageBody } from '../../src/definitions/interfaces'
import { decodeReplyToMessageBody, encodeReplyToMessageBody } from '../../src/utils/reply-to-message-utils'

describe('Reply To Message Utils', () => {
  it('encodes and decodes without chat_id', () => {
    let body: MessageBody, encoded: string, decoded: any

    body = {
      d: generateRandomString(),
      t: generateRandomString()
    }

    encoded = encodeReplyToMessageBody(body.d, body.t)
    decoded = decodeReplyToMessageBody([{ length: 0, offset: 0, type: '', url: encoded.replace('\n<a href="', '').replace('">ㅤ</a>', '') }])

    expect(decoded).toStrictEqual(body)
  })

  it('encodes and decodes with 32 bit chat_id', () => {
    let body: MessageBody, encoded: string, decoded: any

    body = {
      c: 0,
      d: generateRandomString(),
      t: generateRandomString()
    }

    encoded = encodeReplyToMessageBody(body.d, body.t, body.c)
    decoded = decodeReplyToMessageBody([{ length: 0, offset: 0, type: '', url: encoded.replace('\n<a href="', '').replace('">ㅤ</a>', '') }])

    expect(decoded).toStrictEqual(body)
  })

  it('encodes and decodes with 64 bit chat_id', () => {
    let body: MessageBody, encoded: string, decoded: any

    body = {
      c: BigInt(Number.MAX_SAFE_INTEGER) + 1n,
      d: generateRandomString(),
      t: generateRandomString()
    }

    encoded = encodeReplyToMessageBody(body.d, body.t, body.c)
    decoded = decodeReplyToMessageBody([{ length: 0, offset: 0, type: '', url: encoded.replace('\n<a href="', '').replace('">ㅤ</a>', '') }])

    expect(decoded).toStrictEqual(body)
  })
})
