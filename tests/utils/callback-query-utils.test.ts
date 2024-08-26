import { generateRandomString } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { CallbackQueryBody } from '../../src/definitions/interfaces'
import { decodeCallbackQueryBody, encodeCallbackQueryBody } from '../../src/utils/callback-query-utils'

describe('Callback Query Utils', () => {
  it('encodes and decodes without chat_id', () => {
    let body: CallbackQueryBody, encoded: string, decoded: CallbackQueryBody

    body = {
      d: generateRandomString(),
      t: generateRandomString()
    }

    encoded = encodeCallbackQueryBody(body.d, body.t)
    decoded = decodeCallbackQueryBody(encoded)

    expect(decoded).toStrictEqual(body)
  })

  it('encodes and decodes with 32 bit chat_id', () => {
    let body: CallbackQueryBody, encoded: string, decoded: CallbackQueryBody

    body = {
      c: 0,
      d: generateRandomString(),
      t: generateRandomString()
    }

    encoded = encodeCallbackQueryBody(body.d, body.t, body.c)
    decoded = decodeCallbackQueryBody(encoded)

    expect(decoded).toStrictEqual(body)
  })

  it('encodes and decodes with 64 bit chat_id', () => {
    let body: CallbackQueryBody, encoded: string, decoded: CallbackQueryBody

    body = {
      c: BigInt(Number.MAX_SAFE_INTEGER) + 1n,
      d: generateRandomString(),
      t: generateRandomString()
    }

    encoded = encodeCallbackQueryBody(body.d, body.t, body.c)
    decoded = decodeCallbackQueryBody(encoded)

    expect(decoded).toStrictEqual(body)
  })
})
