import { FetchError } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { logOut } from '../../src/requests/log-requests'
import { BOT_TOKEN } from '../../vitest/constants'

describe('Log Requests', () => {
  it('logs out', async () => {
    let out: boolean | FetchError

    out = await logOut(BOT_TOKEN)
    if (out instanceof Error) throw out

    expect(out).toBeTruthy()
  })
})
