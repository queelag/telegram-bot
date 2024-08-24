import type { FetchError } from '@aracna/core'
import type {
  BotCommand,
  BotDescription,
  BotName,
  BotShortDescription,
  BusinessConnection,
  Chat,
  ChatAdministratorRights,
  ChatMember,
  File,
  GameHighScore,
  GetBusinessConnection,
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

export async function getBusinessConnection(token: string, body: GetBusinessConnection): Promise<BusinessConnection | FetchError> {
  return TelegramAPI.post<BusinessConnection, GetBusinessConnection>('getBusinessConnection', body, { token })
}

export async function getChat(token: string, body: GetChat): Promise<Chat | FetchError> {
  return TelegramAPI.post<Chat, GetChat>('getChat', body, { token })
}

export async function getChatAdministrators(token: string, body: GetChatAdministrators): Promise<ChatMember[] | FetchError> {
  return TelegramAPI.post<ChatMember[], GetChatAdministrators>('getChatAdministrators', body, { token })
}

export async function getChatMember(token: string, body: GetChatMember): Promise<ChatMember | FetchError> {
  return TelegramAPI.post<ChatMember, GetChatMember>('getChatMember', body, { token })
}

export async function getChatMemberCount(token: string, body: GetChatMemberCount): Promise<bigint | FetchError> {
  return TelegramAPI.post<bigint, GetChatMemberCount>('getChatMemberCount', body, { token })
}

export async function getChatMenuButton(token: string, body: GetChatMenuButton): Promise<MenuButton | FetchError> {
  return TelegramAPI.post<MenuButton, GetChatMenuButton>('getChatMenuButton', body, { token })
}

export async function getCommands(token: string, body: GetMyCommands): Promise<BotCommand[] | FetchError> {
  return TelegramAPI.post<BotCommand[], GetMyCommands>('getMyCommands', body, { token })
}

export async function getCustomEmojiStickers(token: string, body: GetCustomEmojiStickers): Promise<Sticker[] | FetchError> {
  return TelegramAPI.post<Sticker[], GetCustomEmojiStickers>('getCustomEmojiStickers', body, { token })
}

export async function getDefaultAdministratorRights(token: string, body: GetMyDefaultAdministratorRights): Promise<ChatAdministratorRights | FetchError> {
  return TelegramAPI.post<ChatAdministratorRights, GetMyDefaultAdministratorRights>('getMyDefaultAdministratorRights', body, { token })
}

export async function getDescription(token: string, body: GetMyDescription): Promise<BotDescription | FetchError> {
  return TelegramAPI.post<BotDescription, GetMyDescription>('getMyDescription', body, { token })
}

export async function getFile(token: string, body: GetFile): Promise<File | FetchError> {
  return TelegramAPI.post<File, GetFile>('getFile', body, { token })
}

export async function getForumTopicIconStickers(token: string): Promise<Sticker[] | FetchError> {
  return TelegramAPI.post('getForumTopicIconStickers', undefined, { token })
}

export async function getGameHighScores(token: string, body: GetGameHighScores): Promise<GameHighScore | FetchError> {
  return TelegramAPI.post<GameHighScore, GetGameHighScores>('getGameHighScores', body, { token })
}

export async function getMe(token: string): Promise<User | FetchError> {
  return TelegramAPI.post('getMe', undefined, { token })
}

export async function getMyName(token: string, body: GetMyName): Promise<BotName | FetchError> {
  return TelegramAPI.post('getMyName', body, { token })
}

export async function getMyShortDescription(token: string, body: GetMyShortDescription): Promise<BotShortDescription | FetchError> {
  return TelegramAPI.post('getMyShortDescription', body, { token })
}

export async function getStarTransactions(token: string, body: GetStarTransactions): Promise<StarTransactions | FetchError> {
  return TelegramAPI.post<StarTransactions, GetStarTransactions>('getStarTransactions', body, { token })
}

export async function getStickerSet(token: string, body: GetStickerSet): Promise<StickerSet | FetchError> {
  return TelegramAPI.post<StickerSet, GetStickerSet>('getStickerSet', body, { token })
}

export async function getUpdates(token: string, body: GetUpdates): Promise<Update[] | FetchError> {
  return TelegramAPI.post<Update[], GetUpdates>('getUpdates', body, { token })
}

export async function getUserChatBoosts(token: string, body: GetUserChatBoosts): Promise<UserChatBoosts | FetchError> {
  return TelegramAPI.post<UserChatBoosts, GetUserChatBoosts>('getUserChatBoosts', body, { token })
}

export async function getUserProfilePhotos(token: string, body: GetUserProfilePhotos): Promise<UserProfilePhotos | FetchError> {
  return TelegramAPI.post<UserProfilePhotos, GetUserProfilePhotos>('getUserProfilePhotos', body, { token })
}
