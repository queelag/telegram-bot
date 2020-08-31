import Child from '../modules/child'
import { DeleteChatPhoto, DeleteChatStickerSet, DeleteMessage, DeleteStickerFromSet } from '@queelag/telegram-types'

class Delete extends Child {
  chatPhoto(chat: number): Promise<boolean | Error> {
    return this.telegram.api.post<DeleteChatPhoto, boolean>('deleteChatPhoto', { chat_id: chat })
  }

  chatStickerSet(chat: number): Promise<boolean | Error> {
    return this.telegram.api.post<DeleteChatStickerSet, boolean>('deleteChatStickerSet', { chat_id: chat })
  }

  message(chat: number, message: number): Promise<boolean | Error> {
    return this.telegram.api.post<DeleteMessage, boolean>('deleteMessage', { chat_id: chat, message_id: message })
  }

  stickerFromSet(sticker: string): Promise<boolean | Error> {
    return this.telegram.api.post<DeleteStickerFromSet, boolean>('deleteStickerFromSet', { sticker: sticker })
  }
}

export default Delete
