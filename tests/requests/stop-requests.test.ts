import { FetchError, generateRandomString } from '@aracna/core'
import { Message, Poll } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { deleteMessage } from '../../src/requests/delete-requests'
import { sendLocation, sendPoll } from '../../src/requests/send-requests'
import { stopMessageLiveLocation, stopPoll } from '../../src/requests/stop-requests'
import { BOT_TOKEN, PRIVATE_CHAT_ID } from '../../vitest/constants'

describe('Stop Requests', () => {
  it('stops a live location', async () => {
    let location: Message | FetchError, stop: Message | boolean | FetchError

    location = await sendLocation(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, latitude: 0, live_period: 60, longitude: 0 })
    if (location instanceof Error) throw location

    stop = await stopMessageLiveLocation(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, message_id: location.message_id })

    if (stop instanceof Error) {
      await deleteMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, message_id: location.message_id })
      throw stop
    }

    if (typeof stop === 'boolean') {
      expect(stop).toBeTruthy()
    }

    if (typeof stop === 'object') {
      expect(stop.message_id).toBe(location.message_id)
    }

    await deleteMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, message_id: location.message_id })
  })

  it('stops a poll', async () => {
    let poll: Message | FetchError, stop: Poll | FetchError

    poll = await sendPoll(BOT_TOKEN, {
      chat_id: PRIVATE_CHAT_ID,
      options: [{ text: generateRandomString() }, { text: generateRandomString() }],
      question: generateRandomString()
    })
    if (poll instanceof Error) throw poll

    stop = await stopPoll(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, message_id: poll.message_id })

    if (stop instanceof Error) {
      await deleteMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, message_id: poll.message_id })
      throw stop
    }

    expect(stop.is_closed).toBeTruthy()

    await deleteMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, message_id: poll.message_id })
  })
})
