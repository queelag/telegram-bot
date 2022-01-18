import { FetchError } from '@queelag/core'
import {
  EditMessageCaption,
  EditMessageLiveLocation,
  EditMessageMedia,
  EditMessageReplyMarkup,
  EditMessageText,
  InputMedia,
  Message
} from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Edit extends Child {
  async messageLiveLocation(latitude: number, longitude: number, parameters: Partial<EditMessageLiveLocation>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, EditMessageLiveLocation>('editMessageLiveLocation', { latitude: latitude, longitude: longitude, ...parameters })
  }

  async messageText(text: string, parameters: Partial<EditMessageText>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, EditMessageText>('editMessageText', { text: text, ...parameters })
  }

  async messageCaption(parameters: EditMessageCaption): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, EditMessageCaption>('editMessageCaption', parameters)
  }

  async messageMedia(media: InputMedia, parameters: Partial<EditMessageMedia>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, EditMessageMedia>('editMessageText', { media: media, ...parameters })
  }

  async messageReplyMarkup(parameters: EditMessageReplyMarkup): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, EditMessageReplyMarkup>('editMessageReplyMarkup', parameters)
  }
}
