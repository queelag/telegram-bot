import { appendSearchParamsToURL, generateRandomString } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { StartBody } from '../../src/definitions/interfaces'
import { decodeStartBody, encodeStartBody, encodeStartBodyToAnchorTag, encodeStartBodyToURL } from '../../src/utils/start-message-utils'

describe('Start Message Utils', () => {
  it('encodes and decodes without chat_id', () => {
    let body: StartBody, encoded: string, decoded: StartBody

    body = {
      d: generateRandomString(),
      m: generateRandomString()
    }

    encoded = encodeStartBody({ command: body.m, data: body.d })
    decoded = decodeStartBody(encoded)

    expect(decoded).toStrictEqual(body)
  })

  it('encodes and decodes with 32 bit chat_id', () => {
    let body: StartBody, encoded: string, decoded: StartBody

    body = {
      c: 0,
      d: generateRandomString(),
      m: generateRandomString()
    }

    encoded = encodeStartBody({ chatID: body.c, command: body.m, data: body.d })
    decoded = decodeStartBody(encoded)

    expect(decoded).toStrictEqual(body)
  })

  it('encodes and decodes with 64 bit chat_id', () => {
    let body: StartBody, encoded: string, decoded: StartBody

    body = {
      c: BigInt(Number.MAX_SAFE_INTEGER) + 1n,
      d: generateRandomString(),
      m: generateRandomString()
    }

    encoded = encodeStartBody({ chatID: body.c, command: body.m, data: body.d })
    decoded = decodeStartBody(encoded)

    expect(decoded).toStrictEqual(body)
  })

  it('encodes body to URL', () => {
    let username: string, body: StartBody, url: string

    username = generateRandomString()

    body = {
      c: 0,
      d: generateRandomString(),
      m: generateRandomString()
    }

    url = encodeStartBodyToURL(username, { chatID: body.c, command: body.m, data: body.d })

    expect(url).toBe(appendSearchParamsToURL(`https://t.me/${username}`, { start: encodeStartBody({ chatID: body.c, command: body.m, data: body.d }) }))
  })

  it('encodes body to anchor tag', () => {
    let username: string, body: StartBody, children: string, tag: string

    username = generateRandomString()

    body = {
      c: 0,
      d: generateRandomString(),
      m: generateRandomString()
    }

    children = generateRandomString()

    tag = encodeStartBodyToAnchorTag(username, children, { chatID: body.c, command: body.m, data: body.d })

    expect(tag).toBe(`<a href="${encodeStartBodyToURL(username, { chatID: body.c, command: body.m, data: body.d })}">${children}</a>`)
  })
})
