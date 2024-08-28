import type { FetchError } from '@aracna/core'
import type { ReplaceStickerInSet } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function replaceStickerInSet(body: ReplaceStickerInSet, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, ReplaceStickerInSet>(
    'replaceStickerInSet',
    {
      ...body,
      sticker: {
        ...body.sticker,
        sticker: body.sticker.sticker instanceof Blob ? `attach://sticker_blob` : body.sticker.sticker
      },
      ...(body.sticker.sticker instanceof Blob && { sticker_blob: body.sticker.sticker })
    },
    config
  )
}
