import { FetchError } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { unbanChatMember, unbanChatSenderChat } from '../../src/requests/unban-requests'
import { BOT_ID, BOT_TOKEN, SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Unban Requests', () => {
  it.skip('unbans a chat member', async () => {
    let unban: boolean | FetchError

    // need a member to ban first

    unban = await unbanChatMember(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, user_id: BOT_ID })
    if (unban instanceof Error) throw unban

    expect(unban).toBeTruthy()
  })

  it.skip('unbans a chat sender chat', async () => {
    let unban: boolean | FetchError

    // need a member to ban first

    unban = await unbanChatSenderChat(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, sender_chat_id: BOT_ID })
    if (unban instanceof Error) throw unban

    expect(unban).toBeTruthy
  })
})
