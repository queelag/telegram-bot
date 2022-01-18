import { FetchError, ObjectUtils, StringUtils } from '@queelag/core'
import {
  InlineKeyboardButton,
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
} from '@queelag/telegram-types'
import { InputMediaAlternative, SendMediaGroupAlternative } from '../definitions/interfaces'
import { InputFile } from '../definitions/types'
import { Child } from '../modules/child'
import { Configuration } from '../modules/configuration'
import { HTMLUtils } from '../utils/html.utils'
import { SendPrivate } from './privates/send.private'

export class Send extends Child {
  private: SendPrivate = new SendPrivate(this.telegram)

  async message(chat: number, text: string, parameters?: Partial<SendMessage>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendMessage>('sendMessage', {
      chat_id: chat,
      text: text.substring(0, 4096),
      ...parameters
    })
  }

  async html(chat: number, text: string, parameters?: Partial<SendMessage>): Promise<Message | FetchError> {
    return this.message(chat, HTMLUtils.sanitize(text), {
      parse_mode: 'HTML',
      ...parameters
    })
  }

  async buttons(chat: number, text: string, buttons: InlineKeyboardButton[], parameters?: Partial<SendMessage>): Promise<Message | FetchError | Error> {
    return buttons.length <= 0
      ? Configuration.handler.send.buttons.empty(chat)
      : this.message(chat, text, {
          reply_markup: {
            inline_keyboard: buttons
              .concat(await ObjectUtils.get(Configuration.default.buttons, this.telegram.utils.findButtonsType(buttons), async (chat: number) => [])(chat))
              .map((v: InlineKeyboardButton) => [v])
          },
          ...parameters
        })
  }

  async prompt(chat: number, text: string, parameters?: Partial<SendMessage>): Promise<Message | FetchError> {
    return this.message(chat, text, {
      reply_markup: {
        force_reply: true,
        selective: true
      },
      ...parameters
    })
  }

  async card(chat: number, title: string, description: string, sticker?: InputFile, parameters?: Partial<SendMessage>): Promise<Message | FetchError> {
    let response: Message | FetchError

    response = sticker ? await this.sticker(chat, sticker) : null
    if (response instanceof Error) return response

    return this.html(chat, [`<b>${title}</b>`, '', description].join('\n'), parameters)
  }

  async photo(chat: number, photo: InputFile, parameters?: Partial<SendPhoto>): Promise<Message | FetchError> {
    return this.file<Message, SendPhoto>(chat, photo, 'photo', parameters)
  }

  async audio(chat: number, audio: InputFile, parameters?: Partial<SendAudio>): Promise<Message | FetchError> {
    return this.file<Message, SendAudio>(chat, audio, 'audio', parameters)
  }

  async document(chat: number, document: InputFile, parameters?: Partial<SendDocument>): Promise<Message | FetchError> {
    return this.file<Message, SendDocument>(chat, document, 'document', parameters)
  }

  async video(chat: number, video: InputFile, parameters?: Partial<SendVideo>): Promise<Message | FetchError> {
    return this.file<Message, SendVideo>(chat, video, 'video', parameters)
  }

  async animation(chat: number, animation: InputFile, parameters?: Partial<SendAnimation>): Promise<Message | FetchError> {
    return this.file<Message, SendAnimation>(chat, animation, 'animation', parameters)
  }

  async voice(chat: number, voice: InputFile, parameters?: Partial<SendVoice>): Promise<Message | FetchError> {
    return this.file<Message, SendVoice>(chat, voice, 'voice', parameters)
  }

  async videoNote(chat: number, videoNote: InputFile, parameters?: Partial<SendVideoNote>): Promise<Message | FetchError> {
    return this.file<Message, SendVideoNote>(chat, videoNote, 'video_note', parameters)
  }

  async mediaGroup(chat: number, media: InputMediaAlternative[], parameters?: Partial<SendMediaGroup>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendMediaGroupAlternative>(
      'sendMediaGroup',
      media.every((v: InputMediaAlternative) => v.media instanceof Buffer)
        ? {
            chat_id: chat,
            media: media.map((v: InputMediaAlternative, k: number) => ({ ...v, media: `attach://media_${k}` })),
            ...media.reduce((r: object, v: InputMediaAlternative, k: number) => ({ ...r, [`media_${k}`]: v.media }), {}),
            ...parameters
          }
        : { chat_id: chat, media: media, ...parameters }
    )
  }

  async location(chat: number, latitude: number, longitude: number, parameters?: Partial<SendLocation>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendLocation>('sendLocation', { chat_id: chat, latitude: latitude, longitude: longitude, ...parameters })
  }

  async venue(
    chat: number,
    latitude: number,
    longitude: number,
    title: string,
    address: string,
    parameters?: Partial<SendVenue>
  ): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendVenue>('sendVanue', {
      chat_id: chat,
      latitude: latitude,
      longitude: longitude,
      title: title,
      address: address,
      ...parameters
    })
  }

  async contact(chat: number, phoneNumber: string, firstName: string, parameters?: Partial<SendContact>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendContact>('sendContact', { chat_id: chat, phone_number: phoneNumber, first_name: firstName, ...parameters })
  }

  async poll(chat: number, question: string, options: string[], parameters?: Partial<SendPoll>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendPoll>('sendPoll', { chat_id: chat, question: question, options: options, ...parameters })
  }

  async dice(chat: number, parameters?: Partial<SendDice>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendDice>('sendDice', { chat_id: chat, ...parameters })
  }

  async chatAction(chat: number, action: string): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SendChatAction>('sendChatAction', { chat_id: chat, action: action })
  }

  async sticker(chat: number, sticker: InputFile, parameters?: Partial<SendSticker>): Promise<Message | FetchError> {
    return this.file<Message, SendSticker>(chat, sticker, 'sticker', parameters)
  }

  async invoice(
    chat: number,
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
      chat_id: chat,
      title: title,
      description: description,
      payload: payload,
      provider_token: providerToken,
      start_parameter: startParameter,
      currency: currency,
      prices: prices,
      ...parameters
    })
  }

  async game(chat: number, gameShortName: string, parameters?: Partial<SendGame>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendGame>('sendGame', { chat_id: chat, game_short_name: gameShortName, ...parameters })
  }

  private file<T, U extends object>(chat: number, data: InputFile, type: string, parameters?: Partial<U>): Promise<T | FetchError> {
    return this.telegram.api.post<T, U>('send' + StringUtils.startCase(type), {
      chat_id: chat,
      [type]: data,
      ...(parameters as U)
    })
  }
}
