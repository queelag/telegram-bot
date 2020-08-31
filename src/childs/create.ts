import Child from '../modules/child'
import { CreateNewStickerSet } from '@queelag/telegram-types'

class Create extends Child {
  async stickerSet(user: number, name: string, title: string, parameters: CreateNewStickerSet): Promise<boolean | Error> {
    return this.telegram.api.post<CreateNewStickerSet, boolean>('createNewStickerSet', { user_id: user, name: name, title: title, ...parameters })
  }
}

export default Create
