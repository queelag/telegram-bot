import Child from '../modules/child'
import {
  SetGameScore,
  PassportElementError,
  SetPassportDataErrors,
  SetStickerSetThumb,
  SetStickerPositionInSet,
  BotCommand,
  SetMyCommands,
  SetChatStickerSet,
  SetChatDescription,
  SetChatTitle,
  ChatPermissions,
  SetChatPermissions,
  SetChatAdministratorCustomTitle,
  SetChatPhoto
} from '@queelag/telegram-types'

class Set extends Child {
  chatAdministratorCustomTitle(chat: number, user: number, customTitle: string): Promise<boolean | Error> {
    return this.telegram.api.post<SetChatAdministratorCustomTitle, boolean>('setChatAdministratorCustomTitle', {
      chat_id: chat,
      user_id: user,
      custom_title: customTitle
    })
  }

  chatPermissions(chat: number, permissions: ChatPermissions): Promise<boolean | Error> {
    return this.telegram.api.post<SetChatPermissions, boolean>('setChatTitle', { chat_id: chat, permissions: permissions })
  }

  chatPhoto(chat: number, photo: Buffer): Promise<boolean | Error> {
    return this.telegram.api.post<SetChatPhoto, boolean>('setChatPhoto', { chat_id: chat, photo: photo })
  }

  chatTitle(chat: number, title: string): Promise<boolean | Error> {
    return this.telegram.api.post<SetChatTitle, boolean>('setChatTitle', { chat_id: chat, title: title })
  }

  chatDescription(chat: number, description: string): Promise<boolean | Error> {
    return this.telegram.api.post<SetChatDescription, boolean>('setChatDescription', { chat_id: chat, description: description })
  }

  chatStickerSet(chat: number, stickerSetName: string): Promise<boolean | Error> {
    return this.telegram.api.post<SetChatStickerSet, boolean>('setChatStickerSet', { chat_id: chat, sticker_set_name: stickerSetName })
  }

  command(commands: BotCommand[]): Promise<boolean | Error> {
    return this.telegram.api.post<SetMyCommands, boolean>('setMyCommands', { commands: commands })
  }

  stickerPositionInSet(sticker: string, position: number): Promise<boolean | Error> {
    return this.telegram.api.post<SetStickerPositionInSet, boolean>('setStickerPositionInSet', { sticker: sticker, position: position })
  }

  stickerSetThumb(name: string, user: number, parameters?: SetStickerSetThumb): Promise<boolean | Error> {
    return this.telegram.api.post<SetStickerSetThumb, boolean>('setStickerSetThumb', { name: name, user_id: user, ...parameters })
  }

  passportDataErrors(user: number, errors: PassportElementError[]): Promise<boolean | Error> {
    return this.telegram.api.post<SetPassportDataErrors, boolean>('setPassportDataErrors', { user_id: user, errors: errors })
  }

  gameScore(user: number, score: number, parameters?: SetGameScore): Promise<boolean | Error> {
    return this.telegram.api.post<SetGameScore, boolean>('setGameScore', { user_id: user, score: score, ...parameters })
  }
}

export default Set
