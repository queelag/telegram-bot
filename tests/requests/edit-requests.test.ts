import { FetchError, generateRandomString } from '@aracna/core'
import { ChatInviteLink, ForumTopic, Message } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { createChatInviteLink, createChatSubscriptionInviteLink, createForumTopic } from '../../src/requests/create-requests'
import { deleteMessage } from '../../src/requests/delete-requests'
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
import { BOT_TOKEN, SQUARE_1024_WEBP, SQUARE_512_WEBP, SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Edit Requests', () => {
  it('edits the chat invite link', async () => {
    let link: ChatInviteLink | FetchError, edit: ChatInviteLink | FetchError

    link = await createChatInviteLink(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID })
    if (link instanceof Error) throw link

    edit = await editChatInviteLink(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, invite_link: link.invite_link })
    if (edit instanceof Error) throw edit

    expect(edit.invite_link).toBe(link.invite_link)
  })

  it.skip('edits the chat subscription invite link', async () => {
    let link: ChatInviteLink | FetchError, edit: ChatInviteLink | FetchError

    // needs an exclusive channel

    link = await createChatSubscriptionInviteLink(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, subscription_period: 2592000, subscription_price: 1 })
    if (link instanceof Error) throw link

    edit = await editChatSubscriptionInviteLink(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, invite_link: link.invite_link })
    if (edit instanceof Error) throw edit

    expect(edit.invite_link).toBe(link.invite_link)
  })

  it.skip('edits a forum topic', async () => {
    let topic: ForumTopic | FetchError, edit: boolean | FetchError

    // doesnt work even after making the group support topics

    topic = await createForumTopic(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, name: generateRandomString() })
    if (topic instanceof Error) throw topic

    edit = await editForumTopic(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })
    if (edit instanceof Error) throw edit

    expect(edit).toBeTruthy()
  })

  it('edits a message caption', async () => {
    let message: Message | FetchError, edit: Message | FetchError

    message = await sendPhoto(BOT_TOKEN, { caption: generateRandomString(), chat_id: SUPER_GROUP_CHAT_ID, photo: new File([SQUARE_512_WEBP], 'square.webp') })
    if (message instanceof Error) throw message

    edit = await editMessageCaption(BOT_TOKEN, { caption: generateRandomString(), chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })

    if (edit instanceof Error) {
      await deleteMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })
      throw edit
    }

    expect(edit.caption).not.toBe(message.caption)

    await deleteMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })
  })

  it('edits a message live location', async () => {
    let message: Message | FetchError, edit: Message | FetchError

    message = await sendLocation(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, latitude: 0, live_period: 60, longitude: 0 })
    if (message instanceof Error) throw message

    edit = await editMessageLiveLocation(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, latitude: 1, longitude: 1, message_id: message.message_id })

    if (edit instanceof Error) {
      await deleteMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })
      throw edit
    }

    expect(edit.location?.latitude).not.toBe(message.location?.latitude)
    expect(edit.location?.longitude).not.toBe(message.location?.longitude)

    await deleteMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })
  })

  it('edits a message media', async () => {
    let message: Message | FetchError, edit: Message | FetchError

    message = await sendPhoto(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, photo: new File([SQUARE_512_WEBP], 'square.webp') })
    if (message instanceof Error) throw message

    edit = await editMessageMedia(BOT_TOKEN, {
      chat_id: SUPER_GROUP_CHAT_ID,
      media: { media: new File([SQUARE_1024_WEBP], 'square.webp'), type: 'photo' },
      message_id: message.message_id
    })

    if (edit instanceof Error) {
      await deleteMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })
      throw edit
    }

    await deleteMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })
  })

  it('edits a message reply markup', async () => {
    let message: Message | FetchError, edit: Message | FetchError

    message = await sendMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, reply_markup: { inline_keyboard: [] }, text: generateRandomString() })
    if (message instanceof Error) throw message

    edit = await editMessageReplyMarkup(BOT_TOKEN, {
      chat_id: SUPER_GROUP_CHAT_ID,
      message_id: message.message_id,
      reply_markup: { inline_keyboard: [[getInlineKeyboardUrlButton('Aracna', 'https://aracna.dariosechi.it')]] }
    })

    if (edit instanceof Error) {
      await deleteMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })
      throw edit
    }

    expect(edit.reply_markup?.inline_keyboard[0][0].text).toBe('Aracna')

    await deleteMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })
  })

  it('edits a message text', async () => {
    let message: Message | FetchError, edit: Message | FetchError

    message = await sendMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, text: generateRandomString() })
    if (message instanceof Error) throw message

    edit = await editMessageText(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id, text: generateRandomString() })

    if (edit instanceof Error) {
      await deleteMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })
      throw edit
    }

    expect(edit.text).not.toBe(message.text)

    await deleteMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })
  })
})
