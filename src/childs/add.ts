import { FetchError } from '@queelag/core'
import { AddStickerToSet, Message } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Add extends Child {
  async stickerToSet(user: number, name: string, emojis: string, parameters: Partial<AddStickerToSet>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, AddStickerToSet>('addStickerToSet', { user_id: user, name: name, emojis: emojis, ...parameters })
  }
}
