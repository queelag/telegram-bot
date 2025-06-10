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
  EditUserStarSubscription,
  Message
} from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'
import type { TelegramApiConfig } from '../definitions/interfaces'
import { EditMessageMediaAlternative } from '../definitions/interfaces'

export async function editChatInviteLink(body: EditChatInviteLink, config?: TelegramApiConfig): Promise<ChatInviteLink | FetchError> {
  return TelegramAPI.post<ChatInviteLink, EditChatInviteLink>('editChatInviteLink', body, config)
}

export async function editChatSubscriptionInviteLink(body: EditChatSubscriptionInviteLink, config?: TelegramApiConfig): Promise<ChatInviteLink | FetchError> {
  return TelegramAPI.post<ChatInviteLink, EditChatSubscriptionInviteLink>('editChatSubscriptionInviteLink', body, config)
}

export async function editForumTopic(body: EditForumTopic, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, EditForumTopic>('editForumTopic', body, config)
}

export async function editGeneralForumTopic(body: EditGeneralForumTopic, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, EditGeneralForumTopic>('editGeneralForumTopic', body, config)
}

export async function editMessageCaption(body: EditMessageCaption, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, EditMessageCaption>('editMessageCaption', body, config)
}

export async function editMessageLiveLocation(body: EditMessageLiveLocation, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, EditMessageLiveLocation>('editMessageLiveLocation', body, config)
}

export async function editMessageMedia(body: EditMessageMediaAlternative, config?: TelegramApiConfig): Promise<Message | FetchError> {
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
    config
  )
}

export async function editMessageReplyMarkup(body: EditMessageReplyMarkup, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, EditMessageReplyMarkup>('editMessageReplyMarkup', body, config)
}

export async function editMessageText(body: EditMessageText, config?: TelegramApiConfig): Promise<Message | FetchError> {
  return TelegramAPI.post<Message, EditMessageText>('editMessageText', body, config)
}

export async function editUserStarSubscription(body: EditUserStarSubscription, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, EditUserStarSubscription>('editUserStarSubscription', body, config)
}
