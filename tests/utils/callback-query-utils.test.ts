import { generateRandomString } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { CallbackQueryBody } from '../../src/definitions/interfaces'
import { decodeCallbackQueryBody, encodeCallbackQueryBody } from '../../src/utils/callback-query-utils'

describe('Callback Query Utils', () => {
  it('encodes and decodes without chat_id', () => {
    let body: CallbackQueryBody, encoded: string, decoded: CallbackQueryBody

    body = {
      d: generateRandomString(),
      m: generateRandomString()
    }

    encoded = encodeCallbackQueryBody({ command: body.m, data: body.d })
    decoded = decodeCallbackQueryBody(encoded)

    expect(decoded).toStrictEqual(body)
  })

  it('encodes and decodes with 32 bit chat_id', () => {
    let body: CallbackQueryBody, encoded: string, decoded: CallbackQueryBody

    body = {
      c: 0,
      d: generateRandomString(),
      m: generateRandomString()
    }

    encoded = encodeCallbackQueryBody({ chatID: body.c, command: body.m, data: body.d })
    decoded = decodeCallbackQueryBody(encoded)

    expect(decoded).toStrictEqual(body)
  })

  it('encodes and decodes with 64 bit chat_id', () => {
    let body: CallbackQueryBody, encoded: string, decoded: CallbackQueryBody

    body = {
      c: BigInt(Number.MAX_SAFE_INTEGER) + 1n,
      d: generateRandomString(),
      m: generateRandomString()
    }

    encoded = encodeCallbackQueryBody({ chatID: body.c, command: body.m, data: body.d })
    decoded = decodeCallbackQueryBody(encoded)

    expect(decoded).toStrictEqual(body)
  })
})
