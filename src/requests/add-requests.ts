import { type FetchError } from '@aracna/core'
import type { AddStickerToSet } from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import { TelegramApiConfig } from '../definitions/interfaces'

export async function addStickerToSet(body: AddStickerToSet, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, AddStickerToSet>(
    'addStickerToSet',
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
