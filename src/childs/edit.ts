import {
  EditMessageCaption,
  EditMessageLiveLocation,
  EditMessageMedia,
  EditMessageReplyMarkup,
  EditMessageText,
  InputMedia,
  Message
} from '@queelag/telegram-types'
import Child from '../modules/child'

class Edit extends Child {
  async messageLiveLocation(latitude: number, longitude: number, parameters: Partial<EditMessageLiveLocation>): Promise<Message | Error> {
    return this.telegram.api.post<EditMessageLiveLocation, Message>('editMessageLiveLocation', { latitude: latitude, longitude: longitude, ...parameters })
  }

  async messageText(text: string, parameters: Partial<EditMessageText>): Promise<Message | Error> {
    return this.telegram.api.post<EditMessageText, Message>('editMessageText', { text: text, ...parameters })
  }

  async messageCaption(parameters: EditMessageCaption): Promise<Message | Error> {
    return this.telegram.api.post<EditMessageCaption, Message>('editMessageCaption', parameters)
  }

  async messageMedia(media: InputMedia, parameters: Partial<EditMessageMedia>): Promise<Message | Error> {
    return this.telegram.api.post<EditMessageMedia, Message>('editMessageText', { media: media, ...parameters })
  }

  async messageReplyMarkup(parameters: EditMessageReplyMarkup): Promise<Message | Error> {
    return this.telegram.api.post<EditMessageReplyMarkup, Message>('editMessageReplyMarkup', parameters)
  }
}

export default Edit
