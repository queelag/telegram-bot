import { FetchError, generateRandomString } from '@aracna/core'
import { ChatInviteLink, ForumTopic, Message } from '@aracna/telegram-bot-types'
import { afterAll, describe, expect, it } from 'vitest'
import { createChatInviteLink, createChatSubscriptionInviteLink, createForumTopic } from '../../src/requests/create-requests'
import { deleteMessages } from '../../src/requests/delete-requests'
import {
  editChatInviteLink,
  editChatSubscriptionInviteLink,
  editForumTopic,
  editMessageCaption,
  editMessageLiveLocation,
  editMessageMedia,
  editMessageReplyMarkup,
  editMessageText
} from '../../src/requests/edit-requests'
import { sendLocation, sendMessage, sendPhoto } from '../../src/requests/send-requests'
import { getInlineKeyboardUrlButton } from '../../src/utils/inline-keyboard-utils'
import { SQUARE_1024_WEBP, SQUARE_512_WEBP, SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Edit Requests', () => {
  let messageIDs: number[] = []

  afterAll(async () => {
    await deleteMessages({ chat_id: SUPER_GROUP_CHAT_ID, message_ids: messageIDs })
  })

  it('edits the chat invite link', async () => {
    let link: ChatInviteLink | FetchError, edit: ChatInviteLink | FetchError

    link = await createChatInviteLink({ chat_id: SUPER_GROUP_CHAT_ID })
    if (link instanceof Error) throw link

    edit = await editChatInviteLink({ chat_id: SUPER_GROUP_CHAT_ID, invite_link: link.invite_link })
    if (edit instanceof Error) throw edit

    expect(edit.invite_link).toBe(link.invite_link)
  })

  it.skip('edits the chat subscription invite link', async () => {
    let link: ChatInviteLink | FetchError, edit: ChatInviteLink | FetchError

    // needs an exclusive channel

    link = await createChatSubscriptionInviteLink({ chat_id: SUPER_GROUP_CHAT_ID, subscription_period: 2592000, subscription_price: 1 })
    if (link instanceof Error) throw link

    edit = await editChatSubscriptionInviteLink({ chat_id: SUPER_GROUP_CHAT_ID, invite_link: link.invite_link })
    if (edit instanceof Error) throw edit

    expect(edit.invite_link).toBe(link.invite_link)
  })

  it('edits a forum topic', async () => {
    let topic: ForumTopic | FetchError, edit: boolean | FetchError

    topic = await createForumTopic({ chat_id: SUPER_GROUP_CHAT_ID, name: generateRandomString() })
    if (topic instanceof Error) throw topic

    edit = await editForumTopic({ chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })
    if (edit instanceof Error) throw edit

    expect(edit).toBeTruthy()
  })

  it('edits a message caption', async () => {
    let message: Message | FetchError, edit: Message | FetchError

    message = await sendPhoto({ caption: generateRandomString(), chat_id: SUPER_GROUP_CHAT_ID, photo: new File([SQUARE_512_WEBP], 'square.webp') })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    edit = await editMessageCaption({ caption: generateRandomString(), chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })
    if (edit instanceof Error) throw edit

    expect(edit.caption).not.toBe(message.caption)
  })

  it('edits a message live location', async () => {
    let message: Message | FetchError, edit: Message | FetchError

    message = await sendLocation({ chat_id: SUPER_GROUP_CHAT_ID, latitude: 0, live_period: 60, longitude: 0 })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    edit = await editMessageLiveLocation({ chat_id: SUPER_GROUP_CHAT_ID, latitude: 1, longitude: 1, message_id: message.message_id })
    if (edit instanceof Error) throw edit

    expect(edit.location?.latitude).not.toBe(message.location?.latitude)
    expect(edit.location?.longitude).not.toBe(message.location?.longitude)
  })

  it('edits a message media', async () => {
    let message: Message | FetchError, edit: Message | FetchError

    message = await sendPhoto({ chat_id: SUPER_GROUP_CHAT_ID, photo: new File([SQUARE_512_WEBP], 'square.webp') })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    edit = await editMessageMedia({
      chat_id: SUPER_GROUP_CHAT_ID,
      media: { media: new File([SQUARE_1024_WEBP], 'square.webp'), type: 'photo' },
      message_id: message.message_id
    })
    if (edit instanceof Error) throw edit
  })

  it('edits a message reply markup', async () => {
    let message: Message | FetchError, edit: Message | FetchError

    message = await sendMessage({ chat_id: SUPER_GROUP_CHAT_ID, reply_markup: { inline_keyboard: [] }, text: generateRandomString() })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    edit = await editMessageReplyMarkup({
      chat_id: SUPER_GROUP_CHAT_ID,
      message_id: message.message_id,
      reply_markup: { inline_keyboard: [[getInlineKeyboardUrlButton('Aracna', 'https://aracna.dariosechi.it')]] }
    })
    if (edit instanceof Error) throw edit

    expect(edit.reply_markup?.inline_keyboard[0][0].text).toBe('Aracna')
  })

  it('edits a message text', async () => {
    let message: Message | FetchError, edit: Message | FetchError

    message = await sendMessage({ chat_id: SUPER_GROUP_CHAT_ID, text: generateRandomString() })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    edit = await editMessageText({ chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id, text: generateRandomString() })
    if (edit instanceof Error) throw edit

    expect(edit.text).not.toBe(message.text)
  })
})
