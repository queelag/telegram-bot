import Child from '../modules/child'
import { AddStickerToSet } from '@queelag/telegram-types'

class Add extends Child {
  async stickerToSet(user: number, name: string, parameters: AddStickerToSet): Promise<boolean | Error> {
    return this.telegram.api.post<AddStickerToSet, boolean>('addStickerToSet', { user_id: user, name: name, ...parameters })
  }
}

export default Add
