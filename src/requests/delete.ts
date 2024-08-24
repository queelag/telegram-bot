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

export async function deleteChatPhoto(token: string, body: DeleteChatPhoto): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteChatPhoto>('deleteChatPhoto', body, { token })
}

export async function deleteChatStickerSet(token: string, body: DeleteChatStickerSet): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteChatStickerSet>('deleteChatStickerSet', body, { token })
}

export async function deleteCommands(token: string, body: DeleteMyCommands): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteMyCommands>('deleteMyCommands', body, { token })
}

export async function deleteForumTopic(token: string, body: DeleteForumTopic): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteForumTopic>('deleteForumTopic', body, { token })
}

export async function deleteMessage(token: string, body: DeleteMessage): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteMessage>('deleteMessage', body, { token })
}

export async function deleteMessages(token: string, body: DeleteMessages): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteMessages>('deleteMessages', body, { token })
}

export async function deleteStickerFromSet(token: string, body: DeleteStickerFromSet): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteStickerFromSet>('deleteStickerFromSet', body, { token })
}

export async function deleteStickerSet(token: string, body: DeleteStickerSet): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, DeleteStickerSet>('deleteChatStickerSet', body, { token })
}
