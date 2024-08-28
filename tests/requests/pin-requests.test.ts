import { FetchError, generateRandomString } from '@aracna/core'
import { Message } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { deleteMessage } from '../../src/requests/delete-requests'
import { pinChatMessage } from '../../src/requests/pin-requests'
import { sendMessage } from '../../src/requests/send-requests'
import { PRIVATE_CHAT_ID } from '../../vitest/constants'

describe('Pin Requests', () => {
  it('pins a chat message', async () => {
    let message: Message | FetchError, pin: boolean | FetchError

    message = await sendMessage({ chat_id: PRIVATE_CHAT_ID, text: generateRandomString() })
    if (message instanceof Error) throw message

    pin = await pinChatMessage({ chat_id: PRIVATE_CHAT_ID, message_id: message.message_id })

    if (pin instanceof Error) {
      await deleteMessage({ chat_id: PRIVATE_CHAT_ID, message_id: message.message_id })
      throw pin
    }

    expect(pin).toBeTruthy()

    await deleteMessage({ chat_id: PRIVATE_CHAT_ID, message_id: message.message_id })
  })
})
