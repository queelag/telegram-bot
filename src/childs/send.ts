import { FetchError, getObjectProperty, getPascalCaseString } from '@aracna/core'
import {
  InlineKeyboardButton,
  InputPollOption,
  LabeledPrice,
  Message,
  SendAnimation,
  SendAudio,
  SendChatAction,
  SendContact,
  SendDice,
  SendDocument,
  SendGame,
  SendInvoice,
  SendLocation,
  SendMediaGroup,
  SendMessage,
  SendPhoto,
  SendPoll,
  SendSticker,
  SendVenue,
  SendVideo,
  SendVideoNote,
  SendVoice
} from '@aracna/telegram-bot-types'
import { InputMediaAlternative, SendMediaGroupAlternative } from '../definitions/interfaces'
import { InputFile } from '../definitions/types'
import { Child } from '../modules/child'
import { Configuration } from '../modules/configuration'
import { HTMLUtils } from '../utils/html.utils'
import { InlineKeyboardUtils } from '../utils/inline.keyboard.utils'
import { ReplyToMessageUtils } from '../utils/reply.to.message.utils'
import { SendPrivate } from './privates/send.private'

export class Send extends Child {
  private: SendPrivate = new SendPrivate(this.telegram)

  async animation(chatID: number, file: InputFile, parameters?: Partial<SendAnimation>): Promise<Message | FetchError> {
    return this.file<Message, SendAnimation>(chatID, file, 'animation', parameters)
  }

  async audio(chatID: number, file: InputFile, parameters?: Partial<SendAudio>): Promise<Message | FetchError> {
    return this.file<Message, SendAudio>(chatID, file, 'audio', parameters)
  }

  async document(chatID: number, file: InputFile, parameters?: Partial<SendDocument>): Promise<Message | FetchError> {
    return this.file<Message, SendDocument>(chatID, file, 'document', parameters)
  }

  async buttons(chatID: number, text: string, buttons: InlineKeyboardButton[], parameters?: Partial<SendMessage>): Promise<Message | FetchError | Error> {
    return buttons.length <= 0
      ? Configuration.handler.send.buttons.empty(chatID)
      : this.message(chatID, text, {
          reply_markup: {
            inline_keyboard: buttons
              .concat(await getObjectProperty(Configuration.default.buttons, InlineKeyboardUtils.getButtonsType(buttons), async (chatID: number) => [])(chatID))
              .map((v: InlineKeyboardButton) => [v])
          },
          ...parameters
        })
  }

  async chatAction(chatID: number, action: string): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SendChatAction>('sendChatAction', { chat_id: chatID, action: action })
  }

  async contact(chatID: number, phoneNumber: string, firstName: string, parameters?: Partial<SendContact>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendContact>('sendContact', { chat_id: chatID, first_name: firstName, phone_number: phoneNumber, ...parameters })
  }

  async dice(chatID: number, parameters?: Partial<SendDice>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendDice>('sendDice', { chat_id: chatID, ...parameters })
  }

  async game(chatID: number, gameShortName: string, parameters?: Partial<SendGame>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendGame>('sendGame', { chat_id: chatID, game_short_name: gameShortName, ...parameters })
  }

  async html(chatID: number, text: string, parameters?: Partial<SendMessage>): Promise<Message | FetchError> {
    return this.message(chatID, HTMLUtils.sanitize(text), {
      parse_mode: 'HTML',
      ...parameters
    })
  }

  async invoice(
    chatID: number,
    title: string,
    description: string,
    payload: string,
    providerToken: string,
    startParameter: string,
    currency: string,
    prices: LabeledPrice[],
    parameters?: Partial<SendInvoice>
  ): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendInvoice>('sendInvoice', {
      chat_id: chatID,
      currency: currency,
      description: description,
      payload: payload,
      prices: prices,
      provider_token: providerToken,
      start_parameter: startParameter,
      title: title,
      ...parameters
    })
  }

  async location(chatID: number, latitude: number, longitude: number, parameters?: Partial<SendLocation>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendLocation>('sendLocation', { chat_id: chatID, latitude: latitude, longitude: longitude, ...parameters })
  }

  async mediaGroup(chatID: number, media: InputMediaAlternative[], parameters?: Partial<SendMediaGroup>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendMediaGroupAlternative>(
      'sendMediaGroup',
      media.every((v: InputMediaAlternative) => v.media instanceof Buffer)
        ? {
            chat_id: chatID,
            media: media.map((v: InputMediaAlternative, k: number) => ({ ...v, media: `attach://media_${k}` })),
            ...media.reduce((r: object, v: InputMediaAlternative, k: number) => ({ ...r, [`media_${k}`]: v.media }), {}),
            ...parameters
          }
        : { chat_id: chatID, media: media, ...parameters }
    )
  }

  async message(chatID: number, text: string, parameters?: Partial<SendMessage>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendMessage>('sendMessage', {
      chat_id: chatID,
      text: text,
      ...parameters
    })
  }

  async photo(chatID: number, file: InputFile, parameters?: Partial<SendPhoto>): Promise<Message | FetchError> {
    return this.file<Message, SendPhoto>(chatID, file, 'photo', parameters)
  }

  async poll(chatID: number, question: string, options: InputPollOption[], parameters?: Partial<SendPoll>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendPoll>('sendPoll', { chat_id: chatID, options: options, question: question, ...parameters })
  }

  async repliable<T>(
    chatID: number,
    text: string,
    data: T,
    type: string,
    parameters?: Partial<SendMessage>,
    fromChatID?: number
  ): Promise<Message | FetchError> {
    return this.html(chatID, text + ReplyToMessageUtils.encodeBody(data, type, fromChatID), {
      reply_markup: {
        force_reply: true,
        selective: true
      },
      ...parameters
    })
  }

  async sticker(chatID: number, file: InputFile, parameters?: Partial<SendSticker>): Promise<Message | FetchError> {
    return this.file<Message, SendSticker>(chatID, file, 'sticker', parameters)
  }

  async venue(
    chatID: number,
    latitude: number,
    longitude: number,
    title: string,
    address: string,
    parameters?: Partial<SendVenue>
  ): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendVenue>('sendVanue', {
      address: address,
      chat_id: chatID,
      latitude: latitude,
      longitude: longitude,
      title: title,
      ...parameters
    })
  }

  async video(chatID: number, file: InputFile, parameters?: Partial<SendVideo>): Promise<Message | FetchError> {
    return this.file<Message, SendVideo>(chatID, file, 'video', parameters)
  }

  async videoNote(chatID: number, file: InputFile, parameters?: Partial<SendVideoNote>): Promise<Message | FetchError> {
    return this.file<Message, SendVideoNote>(chatID, file, 'video_note', parameters)
  }

  async voice(chatID: number, file: InputFile, parameters?: Partial<SendVoice>): Promise<Message | FetchError> {
    return this.file<Message, SendVoice>(chatID, file, 'voice', parameters)
  }

  private file<T, U extends object>(chatID: number, data: InputFile, type: string, parameters?: Partial<U>): Promise<T | FetchError> {
    return this.telegram.api.post<T, U>('send' + getPascalCaseString(type), {
      chat_id: chatID,
      [type]: data,
      ...(parameters as U)
    })
  }
}
