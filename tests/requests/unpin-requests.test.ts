import { FetchError, generateRandomString } from '@aracna/core'
import { ForumTopic, Message } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { createForumTopic } from '../../src/requests/create-requests'
import { deleteForumTopic, deleteMessage } from '../../src/requests/delete-requests'
import { pinChatMessage } from '../../src/requests/pin-requests'
import { sendMessage } from '../../src/requests/send-requests'
import { unpinAllChatMessages, unpinAllForumTopicMessages, unpinAllGeneralForumTopicMessages } from '../../src/requests/unpin-requests'
import { BOT_TOKEN, SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Unpin Requests', () => {
  it('unpins all chat messages', async () => {
    let unpin: boolean | FetchError

    unpin = await unpinAllChatMessages(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID })
    if (unpin instanceof Error) throw unpin

    expect(unpin).toBeTruthy()
  })

  it('unpins all forum topic messages', async () => {
    let topic: ForumTopic | FetchError, unpin: boolean | FetchError

    topic = await createForumTopic(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, name: generateRandomString() })
    if (topic instanceof Error) throw topic

    unpin = await unpinAllForumTopicMessages(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })

    if (unpin instanceof Error) {
      await deleteForumTopic(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })
      throw unpin
    }

    await deleteForumTopic(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })

    expect(unpin).toBeTruthy()
  })

  it('unpins all general forum topic messages', async () => {
    let unpin: boolean | FetchError

    unpin = await unpinAllGeneralForumTopicMessages(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID })
    if (unpin instanceof Error) throw unpin

    expect(unpin).toBeTruthy()
  })

  it('unpins a chat message', async () => {
    let message: Message | FetchError, pin: boolean | FetchError, unpin: boolean | FetchError

    message = await sendMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, text: generateRandomString() })
    if (message instanceof Error) throw message

    pin = await pinChatMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })

    if (pin instanceof Error) {
      await deleteMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })
      throw pin
    }

    unpin = await unpinAllChatMessages(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID })

    if (unpin instanceof Error) {
      await deleteMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })
      throw unpin
    }

    await deleteMessage(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_id: message.message_id })

    expect(unpin).toBeTruthy()
  })
})
