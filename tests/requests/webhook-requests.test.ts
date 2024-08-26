import { FetchError } from '@aracna/core'
import { WebhookInfo } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { closeWebhook, deleteWebhook, getWebhookInfo, setWebhook } from '../../src/requests/webhook-requests'
import { BOT_TOKEN } from '../../vitest/constants'

describe('Webhook Requests', () => {
  it.skip('closes the webhook', async () => {
    let set: boolean | FetchError, del: boolean | FetchError, close: boolean | FetchError

    // requires some weird conditions

    set = await setWebhook(BOT_TOKEN, { url: 'https://aracna.dariosechi.it' })
    if (set instanceof Error) throw set

    del = await deleteWebhook(BOT_TOKEN)
    if (del instanceof Error) throw del

    close = await closeWebhook(BOT_TOKEN)
    if (close instanceof Error) throw close

    expect(close).toBeTruthy()
  })

  it('deletes the webhook', async () => {
    let del: boolean | FetchError

    del = await deleteWebhook(BOT_TOKEN)
    if (del instanceof Error) throw del

    expect(del).toBeTruthy()
  })

  it('gets the webhook info', async () => {
    let info: WebhookInfo | FetchError

    info = await getWebhookInfo(BOT_TOKEN)
    if (info instanceof Error) throw info

    expect(info.url).toBeTypeOf('string')
  })

  it('sets the webhook', async () => {
    let set: boolean | FetchError

    set = await setWebhook(BOT_TOKEN, { url: 'https://aracna.dariosechi.it' })
    if (set instanceof Error) throw set

    await deleteWebhook(BOT_TOKEN)

    expect(set).toBeTruthy()
  })
})