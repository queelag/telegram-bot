import { FetchError } from '@aracna/core'
import { CreateNewStickerSet, InputSticker } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Create extends Child {
  async stickerSet(
    userID: number,
    format: string,
    name: string,
    title: string,
    stickers: InputSticker[],
    parameters: Partial<CreateNewStickerSet>
  ): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, CreateNewStickerSet>('createNewStickerSet', {
      name: name,
      sticker_format: format,
      stickers: stickers,
      title: title,
      user_id: userID,
      ...parameters
    })
  }
}
