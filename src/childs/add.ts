import { FetchError } from '@queelag/core'
import { AddStickerToSet, Message } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Add extends Child {
  async stickerToSet(userID: number, name: string, emojis: string, parameters: Partial<AddStickerToSet>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, AddStickerToSet>('addStickerToSet', { emojis: emojis, ...parameters, name: name, user_id: userID })
  }
}
