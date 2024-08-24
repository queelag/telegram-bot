import { type FetchError, getObjectProperty } from '@aracna/core'
import type {
  InlineKeyboardButton,
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
  SendRepliable
} from '../definitions/interfaces'
import { sanitizeHTML } from '../utils/html-utils'
import { getInlineKeyboardButtonsType } from '../utils/inline-keyboard-utils'
import { encodeReplyToMessageBody } from '../utils/reply-to-message-utils'

export async function sendAnimation(token: string, body: SendAnimation): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendAnimation>('sendAnimation', body, { token })
}

export async function sendAudio(token: string, body: SendAudio): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendAudio>('sendAudio', body, { token })
}

export async function sendDocument(token: string, body: SendDocument): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendDocument>('sendDocument', body, { token })
}

export async function sendInlineKeyboardButtons(token: string, body: SendMessage, buttons: InlineKeyboardButton[]): Promise<Message | FetchError | Error> {
  return buttons.length <= 0
    ? Configuration.handler.send.buttons.empty(chatID)
    : sendMessage(token, {
        reply_markup: {
          inline_keyboard: buttons
            .concat(getObjectProperty(Configuration.default.buttons, getInlineKeyboardButtonsType(buttons), (chatID: bigint) => [])(chatID))
            .map((v: InlineKeyboardButton) => [v])
        },
        ...body
      })
}

export async function sendChatAction(token: string, body: SendChatAction): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, SendChatAction>('sendChatAction', body, { token })
}

export async function sendContact(token: string, body: SendContact): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendContact>('sendContact', body, { token })
}

export async function sendDice(token: string, body: SendDice): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendDice>('sendDice', body, { token })
}

export async function sendGame(token: string, body: SendGame): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendGame>('sendGame', body, { token })
}

export async function sendHTML(token: string, body: SendMessage): Promise<Message | FetchError> {
  return sendMessage(token, { parse_mode: 'HTML', ...body, text: sanitizeHTML(body.text) })
}

export async function sendInvoice(token: string, body: SendInvoice): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendInvoice>('sendInvoice', body, { token })
}

export async function sendLocation(token: string, body: SendLocation): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendLocation>('sendLocation', body, { token })
}

export async function sendMediaGroup(token: string, body: SendMediaGroup): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendMediaGroupAlternative>(
    'sendMediaGroup',
    body.media.every((v: InputMediaAlternative) => v.media instanceof Buffer)
      ? {
          ...body,
          media: body.media.map((v: InputMediaAlternative, k: number) => ({ ...v, media: `attach://media_${k}` })),
          ...body.media.reduce((r: object, v: InputMediaAlternative, k: number) => ({ ...r, [`media_${k}`]: v.media }), {})
        }
      : body,
    { token }
  )
}

export async function sendMessage(token: string, body: SendMessage): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendMessage>('sendMessage', body, { token })
}

export async function sendPaidMedia(token: string, body: SendPaidMedia): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendPaidMediaAlternative>(
    'sendPaidMedia',
    {
      ...body,
      media: body.media.map((v: InputPaidMediaAlternative, k: number) => ({ ...v, media: `attach://media_${k}` })),
      ...body.media.reduce((r: object, v: InputPaidMediaAlternative, k: number) => ({ ...r, [`media_${k}`]: v.media }), {})
    },
    { token }
  )
}

export async function sendPhoto(token: string, body: SendPhoto): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendPhoto>('sendPhoto', body, { token })
}

export async function sendPoll(token: string, body: SendPoll): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendPoll>('sendPoll', body, { token })
}

export async function sendRepliable<T>(token: string, body: SendRepliable): Promise<Message | FetchError> {
  return sendMessage(token, {
    reply_markup: { force_reply: true, selective: true },
    ...body,
    text: body.text + encodeReplyToMessageBody(body.data, body.type, body.from_chat_id)
  })
}

export async function sendSticker(token: string, body: SendSticker): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendSticker>('sendSticker', body, { token })
}

export async function sendVenue(token: string, body: SendVenue): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendVenue>('sendVenue', body, { token })
}

export async function sendVideo(token: string, body: SendVideo): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendVideo>('sendVideo', body, { token })
}

export async function sendVideoNote(token: string, body: SendVideoNote): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendVideoNote>('sendVideoNote', body, { token })
}

export async function sendVoice(token: string, body: SendVoice): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, SendVoice>('sendVoice', body, { token })
}
