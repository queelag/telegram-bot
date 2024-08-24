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
  InputMedia,
  Message
} from '@aracna/telegram-bot-types'
import { Child } from '../modules/child'

export class Edit extends Child {
  async chatInviteLink(chatID: bigint, inviteLink: string, parameters?: Partial<EditChatInviteLink>): Promise<ChatInviteLink | FetchError> {
    return this.telegram.api.post<ChatInviteLink, EditChatInviteLink>('editChatInviteLink', { chat_id: chatID, invite_link: inviteLink, ...parameters })
  }

  async chatSubscriptionInviteLInk(
    chatID: bigint,
    inviteLink: string,
    parameters?: Partial<EditChatSubscriptionInviteLink>
  ): Promise<ChatInviteLink | FetchError> {
    return this.telegram.api.post<ChatInviteLink, EditChatSubscriptionInviteLink>('editChatSubscriptionInviteLink', {
      chat_id: chatID,
      invite_link: inviteLink,
      ...parameters
    })
  }

  async forumTopic(chatID: bigint, messageThreadID: number, parameters?: Partial<EditForumTopic>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, EditForumTopic>('editForumTopic', { chat_id: chatID, message_thread_id: messageThreadID, ...parameters })
  }

  async generalForumTopic(chatID: bigint, name: string, parameters?: Partial<EditGeneralForumTopic>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, EditGeneralForumTopic>('editGeneralForumTopic', { chat_id: chatID, name: name, ...parameters })
  }

  async messageCaption(parameters: EditMessageCaption): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, EditMessageCaption>('editMessageCaption', parameters)
  }

  async messageLiveLocation(parameters: EditMessageLiveLocation): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, EditMessageLiveLocation>('editMessageLiveLocation', parameters)
  }

  async messageMedia(media: InputMedia, parameters?: Partial<EditMessageMedia>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, EditMessageMedia>('editMessageMedia', { media: media, ...parameters })
  }

  async messageReplyMarkup(parameters: EditMessageReplyMarkup): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, EditMessageReplyMarkup>('editMessageReplyMarkup', parameters)
  }

  async messageText(text: string, parameters?: Partial<EditMessageText>): Promise<Message | FetchError> {
    return this.telegram.api.post<Message, EditMessageText>('editMessageText', { text: text, ...parameters })
  }
}
