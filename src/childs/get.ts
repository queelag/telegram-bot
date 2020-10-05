import {
  BotCommand,
  Chat,
  ChatMember,
  File,
  GameHighScore,
  GetChat,
  GetChatAdministrators,
  GetChatMember,
  GetChatMembersCount,
  GetFile,
  GetGameHighScores,
  GetStickerSet,
  GetUserProfilePhotos,
  StickerSet,
  User,
  UserProfilePhotos
} from '@queelag/telegram-types'
import Child from '../modules/child'

class Get extends Child {
  async me(): Promise<User | Error> {
    return this.telegram.api.post<null, User>('getMe')
  }

  async file(id: string): Promise<File | Error> {
    return this.telegram.api.post<GetFile, File>('getFile', { file_id: id })
  }

  async userProfilePhotos(id: number, parameters?: Partial<GetUserProfilePhotos>): Promise<UserProfilePhotos[] | Error> {
    return this.telegram.api.post<GetUserProfilePhotos, UserProfilePhotos[]>('getUserProfilePhotos', { user_id: id, ...parameters })
  }

  async chat(id: number): Promise<Chat | Error> {
    return this.telegram.api.post<GetChat, Chat>('getChat', { chat_id: id })
  }

  async chatAdministrators(id: number): Promise<ChatMember[] | Error> {
    return this.telegram.api.post<GetChatAdministrators, ChatMember[]>('getChatAdministrators', { chat_id: id })
  }

  async chatMembersCount(id: number): Promise<number | Error> {
    return this.telegram.api.post<GetChatMembersCount, number>('getChatMembersCount', { chat_id: id })
  }

  async chatMember(chat: number, user: number): Promise<ChatMember | Error> {
    return this.telegram.api.post<GetChatMember, ChatMember>('getChatMember', { chat_id: chat, user_id: user })
  }

  async commands(): Promise<BotCommand[] | Error> {
    return this.telegram.api.post<null, BotCommand[]>('getMyCommands')
  }

  async stickerSet(name: string): Promise<StickerSet | Error> {
    return this.telegram.api.post<GetStickerSet, StickerSet>('getStickerSet', { name: name })
  }

  async gameHighScores(user: number, parameters?: Partial<GetGameHighScores>): Promise<GameHighScore | Error> {
    return this.telegram.api.post<GetGameHighScores, GameHighScore>('getGameHighScores', { user_id: user, ...parameters })
  }
}

export default Get
