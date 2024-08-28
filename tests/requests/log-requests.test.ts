import { FetchError } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { logOut } from '../../src/requests/log-requests'

describe('Log Requests', () => {
  it('logs out', async () => {
    let out: boolean | FetchError

    out = await logOut()
    if (out instanceof Error) throw out

    expect(out).toBeTruthy()
  })
})
