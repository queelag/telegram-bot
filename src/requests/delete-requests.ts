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
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function deleteChatPhoto(body: DeleteChatPhoto, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteChatPhoto>('deleteChatPhoto', body, config)
}

export async function deleteChatStickerSet(body: DeleteChatStickerSet, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteChatStickerSet>('deleteChatStickerSet', body, config)
}

export async function deleteForumTopic(body: DeleteForumTopic, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteForumTopic>('deleteForumTopic', body, config)
}

export async function deleteMessage(body: DeleteMessage, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteMessage>('deleteMessage', body, config)
}

export async function deleteMessages(body: DeleteMessages, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteMessages>('deleteMessages', body, config)
}

export async function deleteMyCommands(body?: DeleteMyCommands, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteMyCommands>('deleteMyCommands', body, config)
}

export async function deleteStickerFromSet(body: DeleteStickerFromSet, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteStickerFromSet>('deleteStickerFromSet', body, config)
}

export async function deleteStickerSet(body: DeleteStickerSet, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteStickerSet>('deleteStickerSet', body, config)
}
