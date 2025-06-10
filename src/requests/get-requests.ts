import type { FetchError } from '@aracna/core'
import type {
  BotCommand,
  BotDescription,
  BotName,
  BotShortDescription,
  Chat,
  ChatAdministratorRights,
  ChatMember,
  File,
  GameHighScore,
  GetChat,
  GetChatAdministrators,
  GetChatMember,
  GetChatMemberCount,
  GetChatMenuButton,
  GetCustomEmojiStickers,
  GetFile,
  GetGameHighScores,
  GetMyCommands,
  GetMyDefaultAdministratorRights,
  GetMyDescription,
  GetMyName,
  GetMyShortDescription,
  GetStarTransactions,
  GetStickerSet,
  GetUpdates,
  GetUserChatBoosts,
  GetUserProfilePhotos,
  MenuButton,
  StarTransactions,
  Sticker,
  StickerSet,
  Update,
  User,
  UserChatBoosts,
  UserProfilePhotos
} from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import { DEFAULT_ALLOWED_UPDATES } from '../definitions/constants'
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function getChat(body: GetChat, config?: TelegramApiConfig): Promise<Chat | FetchError> {
  return TelegramAPI.post<Chat, GetChat>('getChat', body, config)
}

export async function getChatAdministrators(body: GetChatAdministrators, config?: TelegramApiConfig): Promise<ChatMember[] | FetchError> {
  return TelegramAPI.post<ChatMember[], GetChatAdministrators>('getChatAdministrators', body, config)
}

export async function getChatMember(body: GetChatMember, config?: TelegramApiConfig): Promise<ChatMember | FetchError> {
  return TelegramAPI.post<ChatMember, GetChatMember>('getChatMember', body, config)
}

export async function getChatMemberCount(body: GetChatMemberCount, config?: TelegramApiConfig): Promise<number | FetchError> {
  return TelegramAPI.post<number, GetChatMemberCount>('getChatMemberCount', body, config)
}

export async function getChatMenuButton(body: GetChatMenuButton, config?: TelegramApiConfig): Promise<MenuButton | FetchError> {
  return TelegramAPI.post<MenuButton, GetChatMenuButton>('getChatMenuButton', body, config)
}

export async function getCustomEmojiStickers(body: GetCustomEmojiStickers, config?: TelegramApiConfig): Promise<Sticker[] | FetchError> {
  return TelegramAPI.post<Sticker[], GetCustomEmojiStickers>('getCustomEmojiStickers', body, config)
}

export async function getFile(body: GetFile, config?: TelegramApiConfig): Promise<File | FetchError> {
  return TelegramAPI.post<File, GetFile>('getFile', body, config)
}

export async function getForumTopicIconStickers(config?: TelegramApiConfig): Promise<Sticker[] | FetchError> {
  return TelegramAPI.post('getForumTopicIconStickers', undefined, config)
}

export async function getGameHighScores(body: GetGameHighScores, config?: TelegramApiConfig): Promise<GameHighScore[] | FetchError> {
  return TelegramAPI.post<GameHighScore[], GetGameHighScores>('getGameHighScores', body, config)
}

export async function getMe(config?: TelegramApiConfig): Promise<User | FetchError> {
  return TelegramAPI.post('getMe', undefined, config)
}

export async function getMyCommands(body?: GetMyCommands, config?: TelegramApiConfig): Promise<BotCommand[] | FetchError> {
  return TelegramAPI.post<BotCommand[], GetMyCommands>('getMyCommands', body, config)
}

export async function getMyDefaultAdministratorRights(
  body?: GetMyDefaultAdministratorRights,
  config?: TelegramApiConfig
): Promise<ChatAdministratorRights | FetchError> {
  return TelegramAPI.post<ChatAdministratorRights, GetMyDefaultAdministratorRights>('getMyDefaultAdministratorRights', body, config)
}

export async function getMyDescription(body?: GetMyDescription, config?: TelegramApiConfig): Promise<BotDescription | FetchError> {
  return TelegramAPI.post<BotDescription, GetMyDescription>('getMyDescription', body, config)
}

export async function getMyName(body?: GetMyName, config?: TelegramApiConfig): Promise<BotName | FetchError> {
  return TelegramAPI.post('getMyName', body, config)
}

export async function getMyShortDescription(body?: GetMyShortDescription, config?: TelegramApiConfig): Promise<BotShortDescription | FetchError> {
  return TelegramAPI.post('getMyShortDescription', body, config)
}

export async function getStarTransactions(body?: GetStarTransactions, config?: TelegramApiConfig): Promise<StarTransactions | FetchError> {
  return TelegramAPI.post<StarTransactions, GetStarTransactions>('getStarTransactions', body, config)
}

export async function getStickerSet(body: GetStickerSet, config?: TelegramApiConfig): Promise<StickerSet | FetchError> {
  return TelegramAPI.post<StickerSet, GetStickerSet>('getStickerSet', body, config)
}

export async function getUpdates(body?: GetUpdates, config?: TelegramApiConfig): Promise<Update[] | FetchError> {
  let updates: Update | Update[] | FetchError

  updates = await TelegramAPI.post<Update | Update[], GetUpdates>('getUpdates', { allowed_updates: DEFAULT_ALLOWED_UPDATES, ...body }, config)
  if (updates instanceof Error) return updates

  return Array.isArray(updates) ? updates : [updates]
}

export async function getUserChatBoosts(body: GetUserChatBoosts, config?: TelegramApiConfig): Promise<UserChatBoosts | FetchError> {
  return TelegramAPI.post<UserChatBoosts, GetUserChatBoosts>('getUserChatBoosts', body, config)
}

export async function getUserProfilePhotos(body: GetUserProfilePhotos, config?: TelegramApiConfig): Promise<UserProfilePhotos | FetchError> {
  return TelegramAPI.post<UserProfilePhotos, GetUserProfilePhotos>('getUserProfilePhotos', body, config)
}
