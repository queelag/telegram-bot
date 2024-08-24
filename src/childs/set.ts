import type { FetchError } from '@aracna/core'
import type {
  BotCommand,
  ChatAdministratorRights,
  ChatPermissions,
  MaskPosition,
  MenuButton,
  PassportElementError,
  ReactionType,
  SetChatAdministratorCustomTitle,
  SetChatDescription,
  SetChatMenuButton,
  SetChatPermissions,
  SetChatPhoto,
  SetChatStickerSet,
  SetChatTitle,
  SetCustomEmojiStickerSetThumbnail,
  SetGameScore,
  SetMessageReaction,
  SetMyCommands,
  SetMyDefaultAdministratorRights,
  SetMyDescription,
  SetMyName,
  SetMyShortDescription,
  SetPassportDataErrors,
  SetStickerEmojiList,
  SetStickerKeywords,
  SetStickerMaskPosition,
  SetStickerPositionInSet,
  SetStickerSetThumbnail,
  SetStickerSetTitle
} from '@aracna/telegram-bot-types'
import type { InputFile } from '../definitions/types'
import { Child } from '../modules/child'

export class Set extends Child {
  async chatAdministratorCustomTitle(customTitle: string, parameters: Omit<SetChatAdministratorCustomTitle, 'custom_title'>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatAdministratorCustomTitle>('setChatAdministratorCustomTitle', { custom_title: customTitle, ...parameters })
  }

  async chatDescription(chatID: bigint, description?: string, parameters?: Partial<SetChatDescription>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatDescription>('setChatDescription', { chat_id: chatID, description: description, ...parameters })
  }

  async chatMenuButton(chatID: bigint, menuButton?: MenuButton, parameters?: Partial<SetChatMenuButton>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatMenuButton>('setChatMenuButton', { chat_id: chatID, menu_button: menuButton, ...parameters })
  }

  async chatPermissions(chatID: bigint, permissions: ChatPermissions, parameters?: Partial<SetChatPermissions>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatPermissions>('setChatPermissions', { chat_id: chatID, permissions: permissions, ...parameters })
  }

  async chatPhoto(chatID: bigint, photo: InputFile, parameters?: Partial<SetChatPhoto>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatPhoto>('setChatPhoto', { chat_id: chatID, photo: photo, ...parameters })
  }

  async chatStickerSet(chatID: bigint, stickerSetName: string, parameters?: Partial<SetChatStickerSet>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatStickerSet>('setChatStickerSet', { chat_id: chatID, sticker_set_name: stickerSetName, ...parameters })
  }

  async chatTitle(chatID: bigint, title: string, parameters?: Partial<SetChatTitle>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatTitle>('setChatTitle', { chat_id: chatID, title: title, ...parameters })
  }

  async commands(commands: BotCommand[], parameters?: Partial<SetMyCommands>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetMyCommands>('setMyCommands', { commands: commands, ...parameters })
  }

  async customEmojiStickerSetThumbnail(
    name: string,
    customEmojiID?: string,
    parameters?: Partial<SetCustomEmojiStickerSetThumbnail>
  ): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetCustomEmojiStickerSetThumbnail>('setCustomEmojiStickerSetThumbnail', {
      custom_emoji_id: customEmojiID,
      name: name,
      ...parameters
    })
  }

  async defaultAdministratorRights(rights: ChatAdministratorRights, parameters?: Partial<SetMyDefaultAdministratorRights>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetMyDefaultAdministratorRights>('setMyDefaultAdministratorRights', { rights: rights, ...parameters })
  }

  async description(description?: string, parameters?: Partial<SetMyDescription>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetMyDescription>('setMyDescription', { description: description, ...parameters })
  }

  async gameScore(userID: bigint, score: number, parameters?: Partial<SetGameScore>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetGameScore>('setGameScore', { score: score, user_id: userID, ...parameters })
  }

  async messageReaction(chatID: bigint, messageID: number, reaction: ReactionType[], parameters?: Partial<SetMessageReaction>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetMessageReaction>('setMessageReaction', {
      chat_id: chatID,
      message_id: messageID,
      reaction: reaction,
      ...parameters
    })
  }

  async name(name?: string, parameters?: Partial<SetMyName>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetMyName>('setMyName', { name: name, ...parameters })
  }

  async passportDataErrors(userID: bigint, errors: PassportElementError[], parameters?: Partial<SetPassportDataErrors>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetPassportDataErrors>('setPassportDataErrors', { errors: errors, user_id: userID, ...parameters })
  }

  async shortDescription(shortDescription?: string, parameters?: Partial<SetMyShortDescription>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetMyShortDescription>('setMyShortDescription', { short_description: shortDescription, ...parameters })
  }

  async stickerEmojiList(sticker: string, emojis: string[], parameters?: Partial<SetStickerEmojiList>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetStickerEmojiList>('setStickerEmojiList', { emoji_list: emojis, sticker: sticker, ...parameters })
  }

  async stickerKeywords(sticker: string, keywords?: string[], parameters?: Partial<SetStickerKeywords>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetStickerKeywords>('setStickerKeywords', { keywords: keywords, sticker: sticker, ...parameters })
  }

  async stickerMaskPosition(sticker: string, maskPosition?: MaskPosition, parameters?: Partial<SetStickerMaskPosition>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetStickerMaskPosition>('setStickerMaskPosition', { mask_position: maskPosition, sticker: sticker, ...parameters })
  }

  async stickerPositionInSet(sticker: string, position: number, parameters?: Partial<SetStickerPositionInSet>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetStickerPositionInSet>('setStickerPositionInSet', { position: position, sticker: sticker, ...parameters })
  }

  async stickerSetThumbnail(userID: bigint, parameters: Omit<SetStickerSetThumbnail, 'user_id'>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetStickerSetThumbnail>('setStickerSetThumbnail', { user_id: userID, ...parameters })
  }

  async stickerSetTitle(name: string, title: string, parameters?: Partial<SetStickerSetTitle>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetStickerSetTitle>('setStickerSetTitle', { name: name, title: title, ...parameters })
  }
}
