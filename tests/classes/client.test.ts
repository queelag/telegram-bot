import { DeferredPromise } from '@aracna/core'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { Client } from '../../src/classes/client'
import { Context } from '../../src/definitions/interfaces'
import { sendMessage } from '../../src/requests/send-requests'
import { BOT_TOKEN, PRIVATE_CHAT_ID } from '../../vitest/constants'

describe('Client', () => {
  let client: Client

  beforeEach(() => {
    client = new Client(BOT_TOKEN)
  })

  afterEach(async () => {
    await client.disconnect()
  })

  it('connects with polling', async () => {
    let promise: DeferredPromise<Context['message']>

    promise = new DeferredPromise()

    client.on('message', promise.resolve, { command: 'a' })

    await client.connect('polling', { polling: { allowed_updates: ['message'] } })

    await sendMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, text: '/a' })

    await promise.instance
  })
})
