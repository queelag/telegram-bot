import type { FetchError } from '@aracna/core'
import type { ReplaceStickerInSet } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function replaceStickerInSet(token: string, body: ReplaceStickerInSet): Promise<boolean | FetchError> {
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
    { token }
  )
}
