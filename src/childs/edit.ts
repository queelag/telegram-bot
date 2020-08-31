import Child from '../modules/child'
import {
  EditMessageText,
  Message,
  EditMessageCaption,
  InputMediaVideo,
  InputMedia,
  EditMessageMedia,
  EditMessageReplyMarkup,
  EditMessageLiveLocation
} from '@queelag/telegram-types'

class Edit extends Child {
  async messageLiveLocation(latitude: number, longitude: number, parameters: EditMessageLiveLocation): Promise<Message | Error> {
    return this.telegram.api.post<EditMessageLiveLocation, Message>('editMessageLiveLocation', { latitude: latitude, longitude: longitude, ...parameters })
  }

  async messageText(text: string, parameters: EditMessageText): Promise<Message | Error> {
    return this.telegram.api.post<EditMessageText, Message>('editMessageText', { text: text, ...parameters })
  }

  async messageCaption(parameters: EditMessageCaption): Promise<Message | Error> {
    return this.telegram.api.post<EditMessageCaption, Message>('editMessageCaption', parameters)
  }

  async messageMedia(media: InputMedia, parameters: EditMessageMedia): Promise<Message | Error> {
    return this.telegram.api.post<EditMessageMedia, Message>('editMessageText', { media: media, ...parameters })
  }

  async messageReplyMarkup(parameters: EditMessageReplyMarkup): Promise<Message | Error> {
    return this.telegram.api.post<EditMessageReplyMarkup, Message>('editMessageReplyMarkup', parameters)
  }
}

export default Edit
