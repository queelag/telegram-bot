import { FetchError } from '@aracna/core'
import { ChatInviteLink } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { createChatInviteLink } from '../../src/requests/create-requests'
import { revokeChatInviteLink } from '../../src/requests/revoke-requests'
import { SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Revoke Requests', () => {
  it('revokes a chat invite link', async () => {
    let link: ChatInviteLink | FetchError, revoke: ChatInviteLink | FetchError

    link = await createChatInviteLink({ chat_id: SUPER_GROUP_CHAT_ID })
    if (link instanceof Error) throw link

    revoke = await revokeChatInviteLink({ chat_id: SUPER_GROUP_CHAT_ID, invite_link: link.invite_link })
    if (revoke instanceof Error) throw revoke

    expect(revoke.invite_link).toBe(link.invite_link)
  })
})
