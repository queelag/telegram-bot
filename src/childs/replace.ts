import type { FetchError } from '@aracna/core'
import type { InputSticker, ReplaceStickerInSet } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Replace extends Child {
  async stickerInSet(userID: bigint, sticker: InputSticker, parameters: Omit<ReplaceStickerInSet, 'sticker' | 'user_id'>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, ReplaceStickerInSet>('replaceStickerInSet', { sticker: sticker, user_id: userID, ...parameters })
  }
}
