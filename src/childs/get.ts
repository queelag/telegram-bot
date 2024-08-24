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
import { Child } from '../modules/child'

export class Get extends Child {
  async businessConnection(businessConnectionID: string, parameters?: Partial<GetBusinessConnection>): Promise<BusinessConnection | FetchError> {
    return this.telegram.api.post<BusinessConnection, GetBusinessConnection>('getBusinessConnection', {
      business_connection_id: businessConnectionID,
      ...parameters
    })
  }

  async chat(chatID: bigint, parameters?: Partial<GetChat>): Promise<Chat | FetchError> {
    return this.telegram.api.post<Chat, GetChat>('getChat', { chat_id: chatID, ...parameters })
  }

  async chatAdministrators(chatID: bigint, parameters?: Partial<GetChatAdministrators>): Promise<ChatMember[] | FetchError> {
    return this.telegram.api.post<ChatMember[], GetChatAdministrators>('getChatAdministrators', { chat_id: chatID, ...parameters })
  }

  async chatMember(parameters: GetChatMember): Promise<ChatMember | FetchError> {
    return this.telegram.api.post<ChatMember, GetChatMember>('getChatMember', parameters)
  }

  async chatMemberCount(chatID: bigint, parameters?: Partial<GetChatMemberCount>): Promise<bigint | FetchError> {
    return this.telegram.api.post<bigint, GetChatMemberCount>('getChatMemberCount', { chat_id: chatID, ...parameters })
  }

  async chatMenuButton(chatID: bigint, parameters?: Partial<GetChatMenuButton>): Promise<MenuButton | FetchError> {
    return this.telegram.api.post<MenuButton, GetChatMenuButton>('getChatMenuButton', { chat_id: chatID, ...parameters })
  }

  async commands(parameters?: Partial<GetMyCommands>): Promise<BotCommand[] | FetchError> {
    return this.telegram.api.post<BotCommand[], GetMyCommands>('getMyCommands', parameters)
  }

  async customEmojiStickers(customEmojiIDs: string[], parameters?: Partial<GetCustomEmojiStickers>): Promise<Sticker[] | FetchError> {
    return this.telegram.api.post<Sticker[], GetCustomEmojiStickers>('getCustomEmojiStickers', { custom_emoji_ids: customEmojiIDs, ...parameters })
  }

  async defaultAdministratorRights(parameters?: Partial<GetMyDefaultAdministratorRights>): Promise<ChatAdministratorRights | FetchError> {
    return this.telegram.api.post<ChatAdministratorRights, GetMyDefaultAdministratorRights>('getMyDefaultAdministratorRights', parameters)
  }

  async description(parameters?: Partial<GetMyDescription>): Promise<BotDescription | FetchError> {
    return this.telegram.api.post<BotDescription, GetMyDescription>('getMyDescription', parameters)
  }

  async file(fileID: string, parameters?: Partial<GetFile>): Promise<File | FetchError> {
    return this.telegram.api.post<File, GetFile>('getFile', { file_id: fileID, ...parameters })
  }

  async forumTopicIconStickers(): Promise<Sticker[] | FetchError> {
    return this.telegram.api.post('getForumTopicIconStickers')
  }

  async gameHighScores(userID: bigint, parameters?: Partial<GetGameHighScores>): Promise<GameHighScore | FetchError> {
    return this.telegram.api.post<GameHighScore, GetGameHighScores>('getGameHighScores', { user_id: userID, ...parameters })
  }

  async me(): Promise<User | FetchError> {
    return this.telegram.api.post('getMe')
  }

  async name(parameters?: Partial<GetMyName>): Promise<BotName | FetchError> {
    return this.telegram.api.post('getMyName', parameters)
  }

  async shortDescription(parameters?: Partial<GetMyShortDescription>): Promise<BotShortDescription | FetchError> {
    return this.telegram.api.post('getMyShortDescription', parameters)
  }

  async starTransactions(parameters?: Partial<GetStarTransactions>): Promise<StarTransactions | FetchError> {
    return this.telegram.api.post<StarTransactions, GetStarTransactions>('getStarTransactions', parameters)
  }

  async stickerSet(name: string, parameters?: Partial<GetStickerSet>): Promise<StickerSet | FetchError> {
    return this.telegram.api.post<StickerSet, GetStickerSet>('getStickerSet', { name: name, ...parameters })
  }

  async updates(parameters?: Partial<GetUpdates>): Promise<Update[] | FetchError> {
    return this.telegram.api.post<Update[], GetUpdates>('getUpdates', parameters)
  }

  async userChatBoosts(parameters: GetUserChatBoosts): Promise<UserChatBoosts | FetchError> {
    return this.telegram.api.post<UserChatBoosts, GetUserChatBoosts>('getUserChatBoosts', parameters)
  }

  async userProfilePhotos(userID: bigint, parameters?: Partial<GetUserProfilePhotos>): Promise<UserProfilePhotos | FetchError> {
    return this.telegram.api.post<UserProfilePhotos, GetUserProfilePhotos>('getUserProfilePhotos', { user_id: userID, ...parameters })
  }
}
