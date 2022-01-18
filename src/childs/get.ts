import { FetchError } from '@queelag/core'
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
} from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Get extends Child {
  async me(): Promise<User | FetchError> {
    return this.telegram.api.post('getMe')
  }

  async file(id: string): Promise<File | FetchError> {
    return this.telegram.api.post<File, GetFile>('getFile', { file_id: id })
  }

  async userProfilePhotos(id: number, parameters?: Partial<GetUserProfilePhotos>): Promise<UserProfilePhotos | FetchError> {
    return this.telegram.api.post<UserProfilePhotos, GetUserProfilePhotos>('getUserProfilePhotos', { user_id: id, ...parameters })
  }

  async chat(id: number): Promise<Chat | FetchError> {
    return this.telegram.api.post<Chat, GetChat>('getChat', { chat_id: id })
  }

  async chatAdministrators(id: number): Promise<ChatMember[] | FetchError> {
    return this.telegram.api.post<ChatMember[], GetChatAdministrators>('getChatAdministrators', { chat_id: id })
  }

  async chatMemberCount(id: number): Promise<number | FetchError> {
    return this.telegram.api.post<number, GetChatMemberCount>('getChatMemberCount', { chat_id: id })
  }

  async chatMember(chat: number, user: number): Promise<ChatMember | FetchError> {
    return this.telegram.api.post<ChatMember, GetChatMember>('getChatMember', { chat_id: chat, user_id: user })
  }

  async commands(): Promise<BotCommand[] | FetchError> {
    return this.telegram.api.post('getMyCommands')
  }

  async stickerSet(name: string): Promise<StickerSet | FetchError> {
    return this.telegram.api.post<StickerSet, GetStickerSet>('getStickerSet', { name: name })
  }

  async gameHighScores(user: number, parameters?: Partial<GetGameHighScores>): Promise<GameHighScore | FetchError> {
    return this.telegram.api.post<GameHighScore, GetGameHighScores>('getGameHighScores', { user_id: user, ...parameters })
  }
}
