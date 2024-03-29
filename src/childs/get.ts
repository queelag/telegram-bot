import { FetchError } from '@aracna/core'
import {
  BotCommand,
  Chat,
  ChatMember,
  File,
  GameHighScore,
  GetChat,
  GetChatAdministrators,
  GetChatMember,
  GetChatMemberCount,
  GetFile,
  GetGameHighScores,
  GetStickerSet,
  GetUserProfilePhotos,
  StickerSet,
  User,
  UserProfilePhotos
} from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Get extends Child {
  async chat(id: number): Promise<Chat | FetchError> {
    return this.telegram.api.post<Chat, GetChat>('getChat', { chat_id: id })
  }

  async chatAdministrators(id: number): Promise<ChatMember[] | FetchError> {
    return this.telegram.api.post<ChatMember[], GetChatAdministrators>('getChatAdministrators', { chat_id: id })
  }

  async chatMember(chatID: number, userID: number): Promise<ChatMember | FetchError> {
    return this.telegram.api.post<ChatMember, GetChatMember>('getChatMember', { chat_id: chatID, user_id: userID })
  }

  async chatMemberCount(id: number): Promise<number | FetchError> {
    return this.telegram.api.post<number, GetChatMemberCount>('getChatMemberCount', { chat_id: id })
  }

  async commands(): Promise<BotCommand[] | FetchError> {
    return this.telegram.api.post('getMyCommands')
  }

  async file(id: string): Promise<File | FetchError> {
    return this.telegram.api.post<File, GetFile>('getFile', { file_id: id })
  }

  async gameHighScores(userID: number, parameters?: Partial<GetGameHighScores>): Promise<GameHighScore | FetchError> {
    return this.telegram.api.post<GameHighScore, GetGameHighScores>('getGameHighScores', { user_id: userID, ...parameters })
  }

  async me(): Promise<User | FetchError> {
    return this.telegram.api.post('getMe')
  }

  async stickerSet(name: string): Promise<StickerSet | FetchError> {
    return this.telegram.api.post<StickerSet, GetStickerSet>('getStickerSet', { name: name })
  }

  async userProfilePhotos(id: number, parameters?: Partial<GetUserProfilePhotos>): Promise<UserProfilePhotos | FetchError> {
    return this.telegram.api.post<UserProfilePhotos, GetUserProfilePhotos>('getUserProfilePhotos', { user_id: id, ...parameters })
  }
}
