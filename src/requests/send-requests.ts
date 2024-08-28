import { type FetchError } from '@aracna/core'
import type {
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
import { TelegramAPI } from '../apis/telegram-api'
import type {
  InputMediaAlternative,
  InputPaidMediaAlternative,
  SendMediaGroupAlternative,
  SendPaidMediaAlternative,
  SendRepliableMessage,
  TelegramApiConfig
} from '../definitions/interfaces'
import { sanitizeHTML } from '../utils/html-utils'
import { encodeReplyToMessageBodyToAnchorTag } from '../utils/reply-to-message-utils'

export async function sendAnimation(body: SendAnimation, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendAnimation>('sendAnimation', body, config)
}

export async function sendAudio(body: SendAudio, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendAudio>('sendAudio', body, config)
}

export async function sendDocument(body: SendDocument, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendDocument>('sendDocument', body, config)
}

export async function sendChatAction(body: SendChatAction, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SendChatAction>('sendChatAction', body, config)
}

export async function sendContact(body: SendContact, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendContact>('sendContact', body, config)
}

export async function sendDice(body: SendDice, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendDice>('sendDice', body, config)
}

export async function sendGame(body: SendGame, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendGame>('sendGame', body, config)
}

export async function sendInvoice(body: SendInvoice, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendInvoice>('sendInvoice', body, config)
}

export async function sendLocation(body: SendLocation, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendLocation>('sendLocation', body, config)
}

export async function sendMediaGroup(body: SendMediaGroupAlternative, config?: TelegramApiConfig): Promise<Message[] | FetchError> {
  return TelegramAPI.post<Message[], SendMediaGroup>(
    'sendMediaGroup',
    {
      ...body,
      media: body.media.map((media: InputMediaAlternative, index: number) => ({ ...media, media: `attach://media_${index}` })),
      ...body.media.reduce((result: object, media: InputMediaAlternative, index: number) => ({ ...result, [`media_${index}`]: media.media }), {})
    },
    config
  )
}

export async function sendMessage(body: SendMessage, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendMessage>('sendMessage', body, config)
}

export async function sendMessageHTML(body: SendMessage, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return sendMessage({ parse_mode: 'HTML', ...body, text: sanitizeHTML(body.text) }, config)
}

export async function sendPaidMedia(body: SendPaidMediaAlternative, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendPaidMedia>(
    'sendPaidMedia',
    {
      ...body,
      media: body.media.map((v: InputPaidMediaAlternative, k: number) => ({ ...v, media: `attach://media_${k}` })),
      ...body.media.reduce((r: object, v: InputPaidMediaAlternative, k: number) => ({ ...r, [`media_${k}`]: v.media }), {})
    },
    config
  )
}

export async function sendPhoto(body: SendPhoto, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendPhoto>('sendPhoto', body, config)
}

export async function sendPoll(body: SendPoll, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendPoll>('sendPoll', body, config)
}

export async function sendRepliableMessage<T>(body: SendRepliableMessage<T>, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return sendMessage(
    {
      parse_mode: 'HTML',
      reply_markup: { force_reply: true, selective: true },
      ...body,
      text: body.text + encodeReplyToMessageBodyToAnchorTag({ chatID: body.from_chat_id, command: body.command, data: body.data })
    },
    config
  )
}

export async function sendSticker(body: SendSticker, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendSticker>('sendSticker', body, config)
}

export async function sendVenue(body: SendVenue, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendVenue>('sendVenue', body, config)
}

export async function sendVideo(body: SendVideo, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendVideo>('sendVideo', body, config)
}

export async function sendVideoNote(body: SendVideoNote, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendVideoNote>('sendVideoNote', body, config)
}

export async function sendVoice(body: SendVoice, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendVoice>('sendVoice', body, config)
}
