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

    encoded = encodeStartBody(body.d, { command: body.m })
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

    encoded = encodeStartBody(body.d, { chatID: body.c, command: body.m })
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

    encoded = encodeStartBody(body.d, { chatID: body.c, command: body.m })
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

    url = encodeStartBodyToURL(username, body.d, { chatID: body.c, command: body.m })

    expect(url).toBe(appendSearchParamsToURL(`https://t.me/${username}`, { start: encodeStartBody(body.d, { chatID: body.c, command: body.m }) }))
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

    tag = encodeStartBodyToAnchorTag(username, children, body.d, { chatID: body.c, command: body.m })

    expect(tag).toBe(`<a href="${encodeStartBodyToURL(username, body.d, { chatID: body.c, command: body.m })}">${children}</a>`)
  })
})
