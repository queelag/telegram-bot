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
import Child from '../modules/child'

class Set extends Child {
  async chatAdministratorCustomTitle(chat: number, user: number, customTitle: string): Promise<boolean | Error> {
    return this.telegram.api.post<SetChatAdministratorCustomTitle, boolean>('setChatAdministratorCustomTitle', {
      chat_id: chat,
      user_id: user,
      custom_title: customTitle
    })
  }

  async chatPermissions(chat: number, permissions: ChatPermissions): Promise<boolean | Error> {
    return this.telegram.api.post<SetChatPermissions, boolean>('setChatTitle', { chat_id: chat, permissions: permissions })
  }

  async chatPhoto(chat: number, photo: InputFile): Promise<boolean | Error> {
    return this.telegram.api.post<SetChatPhoto, boolean>('setChatPhoto', { chat_id: chat, photo: photo })
  }

  async chatTitle(chat: number, title: string): Promise<boolean | Error> {
    return this.telegram.api.post<SetChatTitle, boolean>('setChatTitle', { chat_id: chat, title: title })
  }

  async chatDescription(chat: number, description: string): Promise<boolean | Error> {
    return this.telegram.api.post<SetChatDescription, boolean>('setChatDescription', { chat_id: chat, description: description })
  }

  async chatStickerSet(chat: number, stickerSetName: string): Promise<boolean | Error> {
    return this.telegram.api.post<SetChatStickerSet, boolean>('setChatStickerSet', { chat_id: chat, sticker_set_name: stickerSetName })
  }

  async commands(commands: BotCommand[]): Promise<boolean | Error> {
    return this.telegram.api.post<SetMyCommands, boolean>('setMyCommands', { commands: commands })
  }

  async stickerPositionInSet(sticker: string, position: number): Promise<boolean | Error> {
    return this.telegram.api.post<SetStickerPositionInSet, boolean>('setStickerPositionInSet', { sticker: sticker, position: position })
  }

  async stickerSetThumb(name: string, user: number, parameters?: Partial<SetStickerSetThumb>): Promise<boolean | Error> {
    return this.telegram.api.post<SetStickerSetThumb, boolean>('setStickerSetThumb', { name: name, user_id: user, ...parameters })
  }

  async passportDataErrors(user: number, errors: PassportElementError[]): Promise<boolean | Error> {
    return this.telegram.api.post<SetPassportDataErrors, boolean>('setPassportDataErrors', { user_id: user, errors: errors })
  }

  async gameScore(user: number, score: number, parameters?: Partial<SetGameScore>): Promise<boolean | Error> {
    return this.telegram.api.post<SetGameScore, boolean>('setGameScore', { user_id: user, score: score, ...parameters })
  }
}

export default Set
