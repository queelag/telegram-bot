import type { FetchError } from '@aracna/core'
import type {
  ChatInviteLink,
  EditChatInviteLink,
  EditChatSubscriptionInviteLink,
  EditForumTopic,
  EditGeneralForumTopic,
  EditMessageCaption,
  EditMessageLiveLocation,
  EditMessageMedia,
  EditMessageReplyMarkup,
  EditMessageText,
  Message
} from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import { EditMessageMediaAlternative } from '../definitions/interfaces'

export async function editChatInviteLink(token: string, body: EditChatInviteLink): Promise<ChatInviteLink | FetchError> {
  return TelegramAPI.post<ChatInviteLink, EditChatInviteLink>('editChatInviteLink', body, { token })
}

export async function editChatSubscriptionInviteLink(token: string, body: EditChatSubscriptionInviteLink): Promise<ChatInviteLink | FetchError> {
  return TelegramAPI.post<ChatInviteLink, EditChatSubscriptionInviteLink>('editChatSubscriptionInviteLink', body, { token })
}

export async function editForumTopic(token: string, body: EditForumTopic): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, EditForumTopic>('editForumTopic', body, { token })
}

export async function editGeneralForumTopic(token: string, body: EditGeneralForumTopic): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, EditGeneralForumTopic>('editGeneralForumTopic', body, { token })
}

export async function editMessageCaption(token: string, body: EditMessageCaption): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, EditMessageCaption>('editMessageCaption', body, { token })
}

export async function editMessageLiveLocation(token: string, body: EditMessageLiveLocation): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, EditMessageLiveLocation>('editMessageLiveLocation', body, { token })
}

export async function editMessageMedia(token: string, body: EditMessageMediaAlternative): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, EditMessageMedia>(
    'editMessageMedia',
    {
      ...body,
      media: {
        ...body.media,
        media: body.media.media instanceof Blob ? `attach://media_blob` : body.media.media
      },
      ...(body.media.media instanceof Blob ? { media_blob: body.media.media } : {})
    },
    { token }
  )
}

export async function editMessageReplyMarkup(token: string, body: EditMessageReplyMarkup): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, EditMessageReplyMarkup>('editMessageReplyMarkup', body, { token })
}

export async function editMessageText(token: string, body: EditMessageText): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, EditMessageText>('editMessageText', body, { token })
}
