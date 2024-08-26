import { describe, expect, it } from 'vitest'
import { getWebhookURL } from '../../src/utils/webhook-utils'
import { BOT_TOKEN } from '../../vitest/constants'

describe('Webhook Utils', () => {
  it('gets the webhook URL', () => {
    expect(getWebhookURL('host.com', BOT_TOKEN)).toBe(`https://host.com/bot${BOT_TOKEN}`)
  })

  it('gets the webhook URL with custom port', () => {
    expect(getWebhookURL('host.com', BOT_TOKEN, 8080)).toBe(`https://host.com:8080/bot${BOT_TOKEN}`)
  })

  it('gets the webhook URL with custom route', () => {
    expect(getWebhookURL('host.com', BOT_TOKEN, undefined, 'custom-route/')).toBe(`https://host.com/custom-route/bot${BOT_TOKEN}`)
  })

  it('gets the webhook URL with custom port and route', () => {
    expect(getWebhookURL('host.com', BOT_TOKEN, 8080, 'custom-route/')).toBe(`https://host.com:8080/custom-route/bot${BOT_TOKEN}`)
  })
})
