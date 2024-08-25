import { FetchError, generateRandomString } from '@aracna/core'
import { Message, MessageId } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { copyMessage, copyMessages } from '../../src/requests/copy-requests'
import { sendMessage } from '../../src/requests/send-requests'
import { BOT_TOKEN, PRIVATE_CHAT_ID } from '../../vitest/constants'

describe('Copy Requests', () => {
  it('copies a chat message', async () => {
    let send: Message | FetchError, copy: MessageId | FetchError

    send = await sendMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, text: generateRandomString() })
    if (send instanceof Error) throw send

    copy = await copyMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, from_chat_id: PRIVATE_CHAT_ID, message_id: send.message_id })
    if (copy instanceof Error) throw copy

    expect(copy.message_id).toBeGreaterThan(send.message_id)
  })

  it('copies multiple chat messages', async () => {
    let s1: Message | FetchError, s2: Message | FetchError, copy: MessageId[] | FetchError

    s1 = await sendMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, text: generateRandomString() })
    if (s1 instanceof Error) throw s1

    s2 = await sendMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, text: generateRandomString() })
    if (s2 instanceof Error) throw s2

    copy = await copyMessages(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, from_chat_id: PRIVATE_CHAT_ID, message_ids: [s1.message_id, s2.message_id] })
    if (copy instanceof Error) throw copy

    expect(copy[0].message_id).toBeGreaterThan(s2.message_id)
    expect(copy[1].message_id).toBeGreaterThan(s2.message_id + 1)
  })
})
