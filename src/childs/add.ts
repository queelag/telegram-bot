import { FetchError } from '@aracna/core'
import { AddStickerToSet, InputSticker, Message } from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Add extends Child {
  async stickerToSet(userID: number, name: string, sticker: InputSticker, parameters: Partial<AddStickerToSet>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, AddStickerToSet>('addStickerToSet', { sticker: sticker, ...parameters, name: name, user_id: userID })
  }
}
