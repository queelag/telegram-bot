import { FetchError } from '@queelag/core'
import { CreateNewStickerSet } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Create extends Child {
  async stickerSet(user: number, name: string, title: string, emojis: string, parameters: Partial<CreateNewStickerSet>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, CreateNewStickerSet>('createNewStickerSet', {
      user_id: user,
      name: name,
      title: title,
      emojis: emojis,
      ...parameters
    })
  }
}
