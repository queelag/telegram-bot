import { FetchError } from '@aracna/core'
import {
  BotCommand,
  ChatPermissions,
  PassportElementError,
  SetChatAdministratorCustomTitle,
  SetChatDescription,
  SetChatPermissions,
  SetChatPhoto,
  SetChatStickerSet,
  SetChatTitle,
  SetGameScore,
  SetMyCommands,
  SetPassportDataErrors,
  SetStickerPositionInSet,
  SetStickerSetThumbnail
} from '@aracna/telegram-bot-types'
import { InputFile } from '../definitions/types'
import { Child } from '../modules/child'

export class Set extends Child {
  async chatAdministratorCustomTitle(chatID: number, userID: number, customTitle: string): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatAdministratorCustomTitle>('setChatAdministratorCustomTitle', {
      custom_title: customTitle,
      chat_id: chatID,
      user_id: userID
    })
  }

  async chatDescription(chatID: number, description: string): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatDescription>('setChatDescription', { chat_id: chatID, description: description })
  }

  async chatPermissions(chatID: number, permissions: ChatPermissions): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatPermissions>('setChatTitle', { chat_id: chatID, permissions: permissions })
  }

  async chatPhoto(chatID: number, photo: InputFile): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatPhoto>('setChatPhoto', { chat_id: chatID, photo: photo })
  }

  async chatStickerSet(chatID: number, stickerSetName: string): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatStickerSet>('setChatStickerSet', { chat_id: chatID, sticker_set_name: stickerSetName })
  }

  async chatTitle(chatID: number, title: string): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatTitle>('setChatTitle', { chat_id: chatID, title: title })
  }

  async commands(commands: BotCommand[], parameters?: Partial<SetMyCommands>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetMyCommands>('setMyCommands', { commands: commands, ...parameters })
  }

  async gameScore(userID: number, score: number, parameters?: Partial<SetGameScore>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetGameScore>('setGameScore', { score: score, user_id: userID, ...parameters })
  }

  async passportDataErrors(userID: number, errors: PassportElementError[]): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetPassportDataErrors>('setPassportDataErrors', { errors: errors, user_id: userID })
  }

  async stickerPositionInSet(sticker: string, position: number): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetStickerPositionInSet>('setStickerPositionInSet', { position: position, sticker: sticker })
  }

  async stickerSetThumb(name: string, userID: number, format: string, parameters?: Partial<SetStickerSetThumbnail>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetStickerSetThumbnail>('setStickerSetThumb', { format: format, name: name, user_id: userID, ...parameters })
  }
}
