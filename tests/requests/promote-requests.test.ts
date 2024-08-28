import { FetchError } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { promoteChatMember } from '../../src/requests/promote-requests'
import { BOT_ID, SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Promote Requests', () => {
  it.skip('promotes a chat member', async () => {
    let promote: boolean | FetchError

    // need another member

    promote = await promoteChatMember({
      can_change_info: true,
      can_delete_messages: true,
      can_delete_stories: true,
      can_edit_messages: true,
      can_edit_stories: true,
      can_invite_users: true,
      can_manage_chat: true,
      can_manage_topics: true,
      can_manage_video_chats: true,
      can_pin_messages: true,
      can_promote_members: true,
      can_restrict_members: true,
      can_post_messages: true,
      can_post_stories: true,
      chat_id: SUPER_GROUP_CHAT_ID,
      user_id: BOT_ID
    })
    if (promote instanceof Error) throw promote

    expect(promote).toBeTruthy()
  })
})
