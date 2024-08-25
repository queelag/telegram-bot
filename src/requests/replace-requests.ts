import type { FetchError } from '@aracna/core'
import type { ReplaceStickerInSet } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function replaceStickerInSet(token: string, body: ReplaceStickerInSet): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, ReplaceStickerInSet>('replaceStickerInSet', body, { token })
}
