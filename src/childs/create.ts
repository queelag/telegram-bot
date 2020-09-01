import Child from '../modules/child'
import { CreateNewStickerSet } from '@queelag/telegram-types'

class Create extends Child {
  async stickerSet(user: number, name: string, title: string, emojis: string, parameters: Partial<CreateNewStickerSet>): Promise<boolean | Error> {
    return this.telegram.api.post<CreateNewStickerSet, boolean>('createNewStickerSet', {
      user_id: user,
      name: name,
      title: title,
      emojis: emojis,
      ...parameters
    })
  }
}

export default Create
