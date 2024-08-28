import { FetchError, generateRandomString } from '@aracna/core'
import { Message, MessageId } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { forwardMessage, forwardMessages } from '../../src/requests/forward-requests'
import { sendMessage } from '../../src/requests/send-requests'
import { PRIVATE_CHAT_ID } from '../../vitest/constants'

describe('Forward Requests', () => {
  it('forwards a chat message', async () => {
    let send: Message | FetchError, forward: MessageId | FetchError

    send = await sendMessage({ chat_id: PRIVATE_CHAT_ID, text: generateRandomString() })
    if (send instanceof Error) throw send

    forward = await forwardMessage({ chat_id: PRIVATE_CHAT_ID, from_chat_id: PRIVATE_CHAT_ID, message_id: send.message_id })
    if (forward instanceof Error) throw forward

    expect(forward.message_id).toBeGreaterThan(send.message_id)
  })

  it('forwards multiple chat messages', async () => {
    let s1: Message | FetchError, s2: Message | FetchError, forward: MessageId[] | FetchError

    s1 = await sendMessage({ chat_id: PRIVATE_CHAT_ID, text: generateRandomString() })
    if (s1 instanceof Error) throw s1

    s2 = await sendMessage({ chat_id: PRIVATE_CHAT_ID, text: generateRandomString() })
    if (s2 instanceof Error) throw s2

    forward = await forwardMessages({ chat_id: PRIVATE_CHAT_ID, from_chat_id: PRIVATE_CHAT_ID, message_ids: [s1.message_id, s2.message_id] })
    if (forward instanceof Error) throw forward

    expect(forward[0].message_id).toBeGreaterThan(s2.message_id)
    expect(forward[1].message_id).toBeGreaterThan(s2.message_id + 1)
  })
})
