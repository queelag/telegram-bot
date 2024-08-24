import type { FetchError } from '@aracna/core'
import type {
  DeleteChatPhoto,
  DeleteChatStickerSet,
  DeleteForumTopic,
  DeleteMessage,
  DeleteMessages,
  DeleteMyCommands,
  DeleteStickerFromSet,
  DeleteStickerSet
} from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Delete extends Child {
  async chatPhoto(chatID: bigint, parameters?: Partial<DeleteChatPhoto>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteChatPhoto>('deleteChatPhoto', { chat_id: chatID, ...parameters })
  }

  async chatStickerSet(chatID: bigint, parameters?: Partial<DeleteChatStickerSet>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteChatStickerSet>('deleteChatStickerSet', { chat_id: chatID, ...parameters })
  }

  async commands(parameters?: Partial<DeleteMyCommands>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteMyCommands>('deleteMyCommands', parameters)
  }

  async forumTopic(chatID: bigint, messageThreadID: number, parameters?: Partial<DeleteForumTopic>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteForumTopic>('deleteForumTopic', { chat_id: chatID, message_thread_id: messageThreadID, ...parameters })
  }

  async message(chatID: bigint, messageID: number, parameters?: Partial<DeleteMessage>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteMessage>('deleteMessage', { chat_id: chatID, message_id: messageID, ...parameters })
  }

  async messages(chatID: bigint, messageIDs: number[], parameters?: Partial<DeleteMessages>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteMessages>('deleteMessages', { chat_id: chatID, message_ids: messageIDs, ...parameters })
  }

  async stickerFromSet(sticker: string, parameters?: Partial<DeleteStickerFromSet>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteStickerFromSet>('deleteStickerFromSet', { sticker: sticker, ...parameters })
  }

  async stickerSet(name: string, parameters?: Partial<DeleteStickerSet>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, DeleteStickerSet>('deleteChatStickerSet', { name: name, ...parameters })
  }
}
