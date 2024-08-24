import { type FetchError, getObjectProperty, getPascalCaseString } from '@aracna/core'
import type {
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
  SendPaidMedia,
  SendPhoto,
  SendPoll,
  SendSticker,
  SendVenue,
  SendVideo,
  SendVideoNote,
  SendVoice
} from '@aracna/telegram-bot-types'
import type {
  InputMediaAlternative,
  InputPaidMediaAlternative,
  SendMediaGroupAlternative,
  SendPaidMediaAlternative,
  SendRepliable
} from '../definitions/interfaces'
import type { InputFile } from '../definitions/types'
import { Child } from '../modules/child'
import { Configuration } from '../modules/configuration'
import { HTMLUtils } from '../utils/html.utils'
import { InlineKeyboardUtils } from '../utils/inline.keyboard.utils'
import { ReplyToMessageUtils } from '../utils/reply.to.message.utils'
import { SendPrivate } from './privates/send.private'

export class Send extends Child {
  private: SendPrivate = new SendPrivate(this.telegram)

  async animation(chatID: bigint, file: InputFile, parameters?: Partial<SendAnimation>): Promise<Message | FetchError> {
    return this.file<Message, SendAnimation>(chatID, file, 'animation', parameters)
  }

  async audio(chatID: bigint, file: InputFile, parameters?: Partial<SendAudio>): Promise<Message | FetchError> {
    return this.file<Message, SendAudio>(chatID, file, 'audio', parameters)
  }

  async document(chatID: bigint, file: InputFile, parameters?: Partial<SendDocument>): Promise<Message | FetchError> {
    return this.file<Message, SendDocument>(chatID, file, 'document', parameters)
  }

  async buttons(chatID: bigint, text: string, buttons: InlineKeyboardButton[], parameters?: Partial<SendMessage>): Promise<Message | FetchError | Error> {
    return buttons.length <= 0
      ? Configuration.handler.send.buttons.empty(chatID)
      : this.message(chatID, text, {
          reply_markup: {
            inline_keyboard: buttons
              .concat(await getObjectProperty(Configuration.default.buttons, InlineKeyboardUtils.getButtonsType(buttons), async (chatID: bigint) => [])(chatID))
              .map((v: InlineKeyboardButton) => [v])
          },
          ...parameters
        })
  }

  async chatAction(chatID: bigint, action: string, parameters?: Partial<SendChatAction>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, SendChatAction>('sendChatAction', { action: action, chat_id: chatID, ...parameters })
  }

  async contact(chatID: bigint, parameters: Omit<SendContact, 'chat_id'>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendContact>('sendContact', { chat_id: chatID, ...parameters })
  }

  async dice(chatID: bigint, parameters?: Partial<SendDice>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendDice>('sendDice', { chat_id: chatID, ...parameters })
  }

  async game(chatID: bigint, gameShortName: string, parameters?: Partial<SendGame>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendGame>('sendGame', { chat_id: chatID, game_short_name: gameShortName, ...parameters })
  }

  async html(chatID: bigint, text: string, parameters?: Partial<SendMessage>): Promise<Message | FetchError> {
    return this.message(chatID, HTMLUtils.sanitize(text), { parse_mode: 'HTML', ...parameters })
  }

  async invoice(chatID: bigint, prices: LabeledPrice[], parameters: Omit<SendInvoice, 'chat_id' | 'prices'>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendInvoice>('sendInvoice', { chat_id: chatID, prices: prices, ...parameters })
  }

  async location(chatID: bigint, parameters: Omit<SendLocation, 'chat_id'>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendLocation>('sendLocation', { chat_id: chatID, ...parameters })
  }

  async mediaGroup(chatID: bigint, media: InputMediaAlternative[], parameters?: Partial<SendMediaGroup>): Promise<Message | FetchError> {
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

  async message(chatID: bigint, text: string, parameters?: Partial<SendMessage>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendMessage>('sendMessage', { chat_id: chatID, text: text, ...parameters })
  }

  async paidMedia(chatID: bigint, media: InputPaidMediaAlternative[], stars: number, parameters?: Partial<SendPaidMedia>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendPaidMediaAlternative>('sendPaidMedia', {
      chat_id: chatID,
      media: media.map((v: InputPaidMediaAlternative, k: number) => ({ ...v, media: `attach://media_${k}` })),
      ...media.reduce((r: object, v: InputPaidMediaAlternative, k: number) => ({ ...r, [`media_${k}`]: v.media }), {}),
      star_count: stars,
      ...parameters
    })
  }

  async photo(chatID: bigint, file: InputFile, parameters?: Partial<SendPhoto>): Promise<Message | FetchError> {
    return this.file<Message, SendPhoto>(chatID, file, 'photo', parameters)
  }

  async poll(chatID: bigint, question: string, options: InputPollOption[], parameters?: Partial<SendPoll>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendPoll>('sendPoll', { chat_id: chatID, options: options, question: question, ...parameters })
  }

  async repliable<T>(chatID: bigint, data: T, parameters: Omit<SendRepliable, 'chat_id' | 'data'>): Promise<Message | FetchError> {
    return this.html(chatID, parameters.text + ReplyToMessageUtils.encodeBody(data, parameters.type, parameters.from_chat_id), {
      reply_markup: { force_reply: true, selective: true },
      ...parameters
    })
  }

  async sticker(chatID: bigint, file: InputFile, parameters?: Partial<SendSticker>): Promise<Message | FetchError> {
    return this.file<Message, SendSticker>(chatID, file, 'sticker', parameters)
  }

  async venue(chatID: bigint, parameters: Omit<SendVenue, 'chat_id'>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, SendVenue>('sendVenue', {
      chat_id: chatID,
      ...parameters
    })
  }

  async video(chatID: bigint, file: InputFile, parameters?: Partial<SendVideo>): Promise<Message | FetchError> {
    return this.file<Message, SendVideo>(chatID, file, 'video', parameters)
  }

  async videoNote(chatID: bigint, file: InputFile, parameters?: Partial<SendVideoNote>): Promise<Message | FetchError> {
    return this.file<Message, SendVideoNote>(chatID, file, 'video_note', parameters)
  }

  async voice(chatID: bigint, file: InputFile, parameters?: Partial<SendVoice>): Promise<Message | FetchError> {
    return this.file<Message, SendVoice>(chatID, file, 'voice', parameters)
  }

  private file<T, U extends object>(chatID: bigint, data: InputFile, type: string, parameters?: Partial<U>): Promise<T | FetchError> {
    return this.telegram.api.post<T, U>('send' + getPascalCaseString(type), { chat_id: chatID, [type]: data, ...(parameters as U) })
  }
}
