import { FetchError } from '@queelag/core'
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
  SetStickerSetThumb
} from '@queelag/telegram-types'
import { InputFile } from '../definitions/types'
import { Child } from '../modules/child'

export class Set extends Child {
  async chatAdministratorCustomTitle(chat: number, user: number, customTitle: string): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatAdministratorCustomTitle>('setChatAdministratorCustomTitle', {
      chat_id: chat,
      user_id: user,
      custom_title: customTitle
    })
  }

  async chatPermissions(chat: number, permissions: ChatPermissions): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatPermissions>('setChatTitle', { chat_id: chat, permissions: permissions })
  }

  async chatPhoto(chat: number, photo: InputFile): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatPhoto>('setChatPhoto', { chat_id: chat, photo: photo })
  }

  async chatTitle(chat: number, title: string): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatTitle>('setChatTitle', { chat_id: chat, title: title })
  }

  async chatDescription(chat: number, description: string): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatDescription>('setChatDescription', { chat_id: chat, description: description })
  }

  async chatStickerSet(chat: number, stickerSetName: string): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetChatStickerSet>('setChatStickerSet', { chat_id: chat, sticker_set_name: stickerSetName })
  }

  async commands(commands: BotCommand[]): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetMyCommands>('setMyCommands', { commands: commands })
  }

  async stickerPositionInSet(sticker: string, position: number): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetStickerPositionInSet>('setStickerPositionInSet', { sticker: sticker, position: position })
  }

  async stickerSetThumb(name: string, user: number, parameters?: Partial<SetStickerSetThumb>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetStickerSetThumb>('setStickerSetThumb', { name: name, user_id: user, ...parameters })
  }

  async passportDataErrors(user: number, errors: PassportElementError[]): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetPassportDataErrors>('setPassportDataErrors', { user_id: user, errors: errors })
  }

  async gameScore(user: number, score: number, parameters?: Partial<SetGameScore>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SetGameScore>('setGameScore', { user_id: user, score: score, ...parameters })
  }
}
