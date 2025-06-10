import type { FetchError } from '@aracna/core'
import type { ConvertGiftToStars, GiftPremiumSubscription, Gifts, SendGift, TransferGift, UpgradeGift } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function convertGiftToStars(body: ConvertGiftToStars, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, ConvertGiftToStars>('convertGiftToStars', body, config)
}

export async function getAvailableGifts(config?: TelegramApiConfig): Promise<Gifts | FetchError> {
  return TelegramAPI.post<Gifts, void>('getAvailableGifts', undefined, config)
}

export async function giftPremiumSubscription(body: GiftPremiumSubscription, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, GiftPremiumSubscription>('giftPremiumSubscription', body, config)
}

export async function sendGift(body: SendGift, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SendGift>('sendGift', body, config)
}

export async function transferGift(body: TransferGift, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, TransferGift>('transferGift', body, config)
}

export async function upgradeGift(body: UpgradeGift, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, UpgradeGift>('upgradeGift', body, config)
}
