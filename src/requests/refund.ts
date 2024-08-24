import type { FetchError } from '@aracna/core'
import type { RefundStarPayment } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function starPayment(token: string, body: RefundStarPayment): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, RefundStarPayment>('refundStarPayment', body, { token })
}
