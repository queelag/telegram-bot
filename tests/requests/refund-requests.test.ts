import { FetchError } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { refundStarPayment } from '../../src/requests/refund-requests'
import { BOT_TOKEN, PRIVATE_CHAT_ID } from '../../vitest/constants'

describe('Refund Requests', () => {
  it.skip('refunds a star payment', async () => {
    let refund: boolean | FetchError

    // need a payment

    refund = await refundStarPayment(BOT_TOKEN, { telegram_payment_charge_id: '', user_id: PRIVATE_CHAT_ID })
    if (refund instanceof Error) throw refund

    expect(refund).toBeTruthy()
  })
})
