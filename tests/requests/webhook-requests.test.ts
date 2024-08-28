import { FetchError } from '@aracna/core'
import { WebhookInfo } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { closeWebhook, deleteWebhook, getWebhookInfo, setWebhook } from '../../src/requests/webhook-requests'

describe('Webhook Requests', () => {
  it.skip('closes the webhook', async () => {
    let set: boolean | FetchError, del: boolean | FetchError, close: boolean | FetchError

    // requires some weird conditions

    set = await setWebhook({ url: 'https://aracna.dariosechi.it' })
    if (set instanceof Error) throw set

    del = await deleteWebhook()
    if (del instanceof Error) throw del

    close = await closeWebhook()
    if (close instanceof Error) throw close

    expect(close).toBeTruthy()
  })

  it('deletes the webhook', async () => {
    let del: boolean | FetchError

    del = await deleteWebhook()
    if (del instanceof Error) throw del

    expect(del).toBeTruthy()
  })

  it('gets the webhook info', async () => {
    let info: WebhookInfo | FetchError

    info = await getWebhookInfo()
    if (info instanceof Error) throw info

    expect(info.url).toBeTypeOf('string')
  })

  it('sets the webhook', async () => {
    let set: boolean | FetchError

    set = await setWebhook({ url: 'https://aracna.dariosechi.it' })
    if (set instanceof Error) throw set

    await deleteWebhook()

    expect(set).toBeTruthy()
  })
})
