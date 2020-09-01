import { DeleteChatPhoto, DeleteChatStickerSet, DeleteMessage, DeleteStickerFromSet } from '@queelag/telegram-types'
import Child from '../modules/child'

class Delete extends Child {
  async chatPhoto(chat: number): Promise<boolean | Error> {
    return this.telegram.api.post<DeleteChatPhoto, boolean>('deleteChatPhoto', { chat_id: chat })
  }

  async chatStickerSet(chat: number): Promise<boolean | Error> {
    return this.telegram.api.post<DeleteChatStickerSet, boolean>('deleteChatStickerSet', { chat_id: chat })
  }

  async message(chat: number, message: number): Promise<boolean | Error> {
    return this.telegram.api.post<DeleteMessage, boolean>('deleteMessage', { chat_id: chat, message_id: message })
  }

  async stickerFromSet(sticker: string): Promise<boolean | Error> {
    return this.telegram.api.post<DeleteStickerFromSet, boolean>('deleteStickerFromSet', { sticker: sticker })
  }
}

export default Delete
