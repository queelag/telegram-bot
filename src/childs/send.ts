import Child from '../modules/child'
import {
  Message,
  InlineKeyboardButton,
  SendMessage,
  SendPhoto,
  SendDocument,
  SendAudio,
  SendVideo,
  SendAnimation,
  SendVoice,
  SendVideoNote,
  SendMediaGroup,
  InputMediaPhoto,
  InputMediaVideo,
  SendLocation,
  SendVenue,
  SendContact,
  SendPoll,
  SendDice,
  SendChatAction,
  SendSticker,
  LabeledPrice,
  SendInvoice,
  SendGame
} from '@queelag/telegram-types'
import HTMLUtils from '../utils/html.utils'
import StringUtils from '../utils/string.utils'

class Send extends Child {
  async message(chat: number, text: string, parameters?: Partial<SendMessage>): Promise<Message | Error> {
    return this.telegram.api.post<SendMessage, Message>('sendMessage', {
      chat_id: chat,
      text: text.substring(0, 4096),
      ...parameters
    })
  }

  async html(chat: number, text: string, parameters?: Partial<SendMessage>): Promise<Message | Error> {
    return this.message(chat, HTMLUtils.sanitize(text), {
      parse_mode: 'HTML',
      ...parameters
    })
  }

  async buttons(chat: number, text: string, buttons: InlineKeyboardButton[], parameters?: Partial<SendMessage>): Promise<Message | Error> {
    return this.message(chat, text, {
      reply_markup: {
        inline_keyboard: buttons.reduce((r: [InlineKeyboardButton][], v: InlineKeyboardButton) => [...r, [v]], [])
      },
      ...parameters
    })
  }

  async prompt(chat: number, text: string, parameters?: Partial<SendMessage>): Promise<Message | Error> {
    return this.message(chat, text, {
      reply_markup: {
        force_reply: true,
        selective: true
      },
      ...parameters
    })
  }

  async card(chat: number, title: string, description: string, sticker?: Buffer, parameters?: Partial<SendMessage>): Promise<Message | Error> {
    let response: Message | Error

    response = sticker ? await this.sticker(chat, sticker) : null
    if (response instanceof Error) return response

    return this.html(chat, [`<b>${title}</b>`, '', description].join('\n'), parameters)
  }

  async photo(chat: number, photo: Buffer, parameters?: Partial<SendPhoto>): Promise<Message | Error> {
    return this.file<SendPhoto, Message>(chat, photo, 'photo', parameters)
  }

  async audio(chat: number, audio: Buffer, parameters?: Partial<SendAudio>): Promise<Message | Error> {
    return this.file<SendAudio, Message>(chat, audio, 'audio', parameters)
  }

  async document(chat: number, document: Buffer, parameters?: Partial<SendDocument>): Promise<Message | Error> {
    return this.file<SendDocument, Message>(chat, document, 'document', parameters)
  }

  async video(chat: number, video: Buffer, parameters?: Partial<SendVideo>): Promise<Message | Error> {
    return this.file<SendVideo, Message>(chat, video, 'video', parameters)
  }

  async animation(chat: number, animation: Buffer, parameters?: Partial<SendAnimation>): Promise<Message | Error> {
    return this.file<SendAnimation, Message>(chat, animation, 'animation', parameters)
  }

  async voice(chat: number, voice: Buffer, parameters?: Partial<SendVoice>): Promise<Message | Error> {
    return this.file<SendVoice, Message>(chat, voice, 'voice', parameters)
  }

  async videoNote(chat: number, videoNote: Buffer, parameters?: Partial<SendVideoNote>): Promise<Message | Error> {
    return this.file<SendVideoNote, Message>(chat, videoNote, 'video_note', parameters)
  }

  async mediaGroup(chat: number, media: (InputMediaPhoto | InputMediaVideo)[], parameters?: Partial<SendMediaGroup>): Promise<Message | Error> {
    return this.telegram.api.post<SendMediaGroup, Message>('sendMediaGroup', { chat_id: chat, media: media, ...parameters })
  }

  async location(chat: number, latitude: number, longitude: number, parameters?: Partial<SendLocation>): Promise<Message | Error> {
    return this.telegram.api.post<SendLocation, Message>('sendLocation', { chat_id: chat, latitude: latitude, longitude: longitude, ...parameters })
  }

  async venue(chat: number, latitude: number, longitude: number, title: string, address: string, parameters?: Partial<SendVenue>): Promise<Message | Error> {
    return this.telegram.api.post<SendVenue, Message>('sendVanue', {
      chat_id: chat,
      latitude: latitude,
      longitude: longitude,
      title: title,
      address: address,
      ...parameters
    })
  }

  async contact(chat: number, phoneNumber: string, firstName: string, parameters?: Partial<SendContact>): Promise<Message | Error> {
    return this.telegram.api.post<SendContact, Message>('sendContact', { chat_id: chat, phone_number: phoneNumber, first_name: firstName, ...parameters })
  }

  async poll(chat: number, question: string, options: string[], parameters?: Partial<SendPoll>): Promise<Message | Error> {
    return this.telegram.api.post<SendPoll, Message>('sendPoll', { chat_id: chat, question: question, options: options, ...parameters })
  }

  async dice(chat: number, parameters?: Partial<SendDice>): Promise<Message | Error> {
    return this.telegram.api.post<SendDice, Message>('sendDice', { chat_id: chat, ...parameters })
  }

  async chatAction(chat: number, action: string): Promise<boolean | Error> {
    return this.telegram.api.post<SendChatAction, boolean>('sendChatAction', { chat_id: chat, action: action })
  }

  async sticker(chat: number, sticker: Buffer, parameters?: Partial<SendSticker>): Promise<Message | Error> {
    return this.file<SendSticker, Message>(chat, sticker, 'sticker', parameters)
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
  ): Promise<Message | Error> {
    return this.telegram.api.post<SendInvoice, Message>('sendInvoice', {
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

  async game(chat: number, gameShortName: string, parameters?: Partial<SendGame>): Promise<Message | Error> {
    return this.telegram.api.post<SendGame, Message>('sendGame', { chat_id: chat, game_short_name: gameShortName, ...parameters })
  }

  private file<T extends object, U>(chat: number, buffer: Buffer, type: string, parameters?: Partial<T>): Promise<U | Error> {
    return this.telegram.api.post<T, U>('send' + StringUtils.startCase(type), {
      chat_id: chat,
      [type]: buffer,
      ...(parameters as T)
    })
  }
}

export default Send
