import type { FetchError } from '@aracna/core'
import type { RefundStarPayment } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api.js'
import type { TelegramApiConfig } from '../definitions/interfaces.js'

export async function refundStarPayment(body: RefundStarPayment, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, RefundStarPayment>('refundStarPayment', body, config)
}
