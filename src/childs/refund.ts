import type { FetchError } from '@aracna/core'
import type { RefundStarPayment } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Refund extends Child {
  async starPayment(userID: bigint, telegramPaymentChargeID: string, parameters?: Partial<RefundStarPayment>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, RefundStarPayment>('refundStarPayment', {
      telegram_payment_charge_id: telegramPaymentChargeID,
      user_id: userID,
      ...parameters
    })
  }
}
