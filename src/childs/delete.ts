import { FetchError } from '@queelag/core'
import { DeleteChatPhoto, DeleteChatStickerSet, DeleteMessage, DeleteStickerFromSet } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Delete extends Child {
  async chatPhoto(chatID: number): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteChatPhoto>('deleteChatPhoto', { chat_id: chatID })
  }

  async chatStickerSet(chatID: number): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteChatStickerSet>('deleteChatStickerSet', { chat_id: chatID })
  }

  async message(chatID: number, message: number): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteMessage>('deleteMessage', { chat_id: chatID, message_id: message })
  }

  async stickerFromSet(sticker: string): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteStickerFromSet>('deleteStickerFromSet', { sticker: sticker })
  }
}
