import { appendSearchParamsToURL, generateRandomString } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { MessageBody } from '../../src/definitions/interfaces'
import {
  decodeStartMessageBody,
  encodeStartMessageBody,
  encodeStartMessageBodyToAnchorTag,
  encodeStartMessageBodyToURL
} from '../../src/utils/start-message-utils'

describe('Start Message Utils', () => {
  it('encodes and decodes without chat_id', () => {
    let body: MessageBody, encoded: string, decoded: MessageBody

    body = {
      d: generateRandomString(),
      t: generateRandomString()
    }

    encoded = encodeStartMessageBody(body.d, body.t)
    decoded = decodeStartMessageBody(encoded)

    expect(decoded).toStrictEqual(body)
  })

  it('encodes and decodes with 32 bit chat_id', () => {
    let body: MessageBody, encoded: string, decoded: MessageBody

    body = {
      c: 0,
      d: generateRandomString(),
      t: generateRandomString()
    }

    encoded = encodeStartMessageBody(body.d, body.t, body.c)
    decoded = decodeStartMessageBody(encoded)

    expect(decoded).toStrictEqual(body)
  })

  it('encodes and decodes with 64 bit chat_id', () => {
    let body: MessageBody, encoded: string, decoded: MessageBody

    body = {
      c: BigInt(Number.MAX_SAFE_INTEGER) + 1n,
      d: generateRandomString(),
      t: generateRandomString()
    }

    encoded = encodeStartMessageBody(body.d, body.t, body.c)
    decoded = decodeStartMessageBody(encoded)

    expect(decoded).toStrictEqual(body)
  })

  it('encodes body to URL', () => {
    let username: string, body: MessageBody, url: URL

    username = generateRandomString()

    body = {
      c: 0,
      d: generateRandomString(),
      t: generateRandomString()
    }

    url = encodeStartMessageBodyToURL(username, body.d, body.t, body.c)

    expect(url.href).toBe(appendSearchParamsToURL(`https://t.me/${username}`, { start: encodeStartMessageBody(body.d, body.t, body.c) }))
  })

  it('encodes body to anchor tag', () => {
    let username: string, body: MessageBody, children: string, tag: string

    username = generateRandomString()

    body = {
      c: 0,
      d: generateRandomString(),
      t: generateRandomString()
    }

    children = generateRandomString()

    tag = encodeStartMessageBodyToAnchorTag(username, body.d, body.t, children, body.c)

    expect(tag).toBe(`<a href="${encodeStartMessageBodyToURL(username, body.d, body.t, body.c)}">${children}</a>`)
  })
})
