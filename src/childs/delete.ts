import { FetchError } from '@queelag/core'
import { DeleteChatPhoto, DeleteChatStickerSet, DeleteMessage, DeleteStickerFromSet } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Delete extends Child {
  async chatPhoto(chat: number): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteChatPhoto>('deleteChatPhoto', { chat_id: chat })
  }

  async chatStickerSet(chat: number): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteChatStickerSet>('deleteChatStickerSet', { chat_id: chat })
  }

  async message(chat: number, message: number): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteMessage>('deleteMessage', { chat_id: chat, message_id: message })
  }

  async stickerFromSet(sticker: string): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteStickerFromSet>('deleteStickerFromSet', { sticker: sticker })
  }
}
