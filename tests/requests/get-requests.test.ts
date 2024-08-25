import { FetchError } from '@aracna/core'
import { Chat, User } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { getChat, getMe } from '../../src/requests/get-requests'
import { BOT_ID, BOT_TOKEN, PRIVATE_CHAT_ID } from '../../vitest/constants'

describe('Get Requests', () => {
  it('gets a chat', async () => {
    let chat: Chat | FetchError

    chat = await getChat(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID })
    if (chat instanceof Error) throw chat

    expect(chat.id).toBe(PRIVATE_CHAT_ID)
  })

  it('gets me', async () => {
    let me: User | FetchError

    me = await getMe(BOT_TOKEN)
    if (me instanceof Error) throw me

    expect(me.id).toBe(BOT_ID)
  })
})
