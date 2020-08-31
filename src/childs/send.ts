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
  message(chat: number, text: string, parameters?: SendMessage): Promise<Message | Error> {
    return this.telegram.api.post<SendMessage, Message>('sendMessage', {
      chat_id: chat,
      text: text.substring(0, 4096),
      ...parameters
    })
  }

  html(chat: number, text: string, parameters?: SendMessage): Promise<Message | Error> {
    return this.message(chat, HTMLUtils.sanitize(text), {
      parse_mode: 'HTML',
      ...parameters
    })
  }

  buttons(chat: number, text: string, buttons: InlineKeyboardButton[], parameters?: SendMessage): Promise<Message | Error> {
    return this.message(chat, text, {
      reply_markup: {
        inline_keyboard: [buttons]
      },
      ...parameters
    })
  }

  prompt(chat: number, text: string, parameters?: SendMessage): Promise<Message | Error> {
    return this.message(chat, text, {
      reply_markup: {
        force_reply: true,
        selective: true
      },
      ...parameters
    })
  }

  photo(chat: number, photo: Buffer, parameters?: SendPhoto): Promise<Message | Error> {
    return this.file<SendPhoto, Message>(chat, photo, 'photo', parameters)
  }

  audio(chat: number, audio: Buffer, parameters?: SendAudio): Promise<Message | Error> {
    return this.file<SendAudio, Message>(chat, audio, 'audio', parameters)
  }

  document(chat: number, document: Buffer, parameters?: SendDocument): Promise<Message | Error> {
    return this.file<SendDocument, Message>(chat, document, 'document', parameters)
  }

  video(chat: number, video: Buffer, parameters?: SendVideo): Promise<Message | Error> {
    return this.file<SendVideo, Message>(chat, video, 'video', parameters)
  }

  animation(chat: number, animation: Buffer, parameters?: SendAnimation): Promise<Message | Error> {
    return this.file<SendAnimation, Message>(chat, animation, 'animation', parameters)
  }

  voice(chat: number, voice: Buffer, parameters?: SendVoice): Promise<Message | Error> {
    return this.file<SendVoice, Message>(chat, voice, 'voice', parameters)
  }

  videoNote(chat: number, videoNote: Buffer, parameters?: SendVideoNote): Promise<Message | Error> {
    return this.file<SendVideoNote, Message>(chat, videoNote, 'video_note', parameters)
  }

  mediaGroup(chat: number, media: (InputMediaPhoto | InputMediaVideo)[], parameters?: SendMediaGroup): Promise<Message | Error> {
    return this.telegram.api.post<SendMediaGroup, Message>('sendMediaGroup', { chat_id: chat, media: media, ...parameters })
  }

  location(chat: number, latitude: number, longitude: number, parameters?: SendLocation): Promise<Message | Error> {
    return this.telegram.api.post<SendLocation, Message>('sendLocation', { chat_id: chat, latitude: latitude, longitude: longitude, ...parameters })
  }

  venue(chat: number, latitude: number, longitude: number, title: string, address: string, parameters?: SendVenue): Promise<Message | Error> {
    return this.telegram.api.post<SendLocation, Message>('sendVanue', {
      chat_id: chat,
      latitude: latitude,
      longitude: longitude,
      title: title,
      address: address,
      ...parameters
    })
  }

  contact(chat: number, phoneNumber: number, firstName: string, parameters?: SendContact): Promise<Message | Error> {
    return this.telegram.api.post<SendContact, Message>('sendContact', { chat_id: chat, phone_number: phoneNumber, first_name: firstName, ...parameters })
  }

  poll(chat: number, question: string, options: string[], parameters?: SendPoll): Promise<Message | Error> {
    return this.telegram.api.post<SendPoll, Message>('sendPoll', { chat_id: chat, question: question, options: options, ...parameters })
  }

  dice(chat: number, parameters?: SendDice): Promise<Message | Error> {
    return this.telegram.api.post<SendDice, Message>('sendDice', { chat_id: chat, ...parameters })
  }

  chatAction(chat: number, action: string): Promise<boolean | Error> {
    return this.telegram.api.post<SendChatAction, boolean>('sendChatAction', { chat_id: chat, action: action })
  }

  sticker(chat: number, sticker: Buffer, parameters?: SendSticker): Promise<Message | Error> {
    return this.file<SendSticker, Message>(chat, sticker, 'sticker', parameters)
  }

  invoice(
    chat: number,
    title: string,
    description: string,
    payload: string,
    providerToken: string,
    startParameter: string,
    currency: string,
    prices: LabeledPrice[],
    parameters?: SendInvoice
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

  game(chat: number, gameShortName: string, parameters?: SendGame): Promise<Message | Error> {
    return this.telegram.api.post<SendGame, Message>('sendGame', { chat_id: chat, game_short_name: gameShortName, ...parameters })
  }

  private file<T extends object, U>(chat: number, buffer: Buffer, type: string, parameters?: T): Promise<U | Error> {
    return this.telegram.api.post<T, U>('send' + StringUtils.startCase(type), {
      chat_id: chat,
      [type]: buffer,
      ...parameters
    })
  }
}

export default Send
