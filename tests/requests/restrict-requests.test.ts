import { FetchError } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { restrictChatMember } from '../../src/requests/restrict-requests'
import { BOT_TOKEN, PRIVATE_CHAT_ID, SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Restrict Requests', () => {
  it.skip('restricts a chat member', async () => {
    let restrict: boolean | FetchError

    // need another member

    restrict = await restrictChatMember(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, permissions: {}, user_id: PRIVATE_CHAT_ID })
    if (restrict instanceof Error) throw restrict

    expect(restrict).toBeTruthy
  })
})
