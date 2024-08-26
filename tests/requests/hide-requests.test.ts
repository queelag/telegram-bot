import { FetchError } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { hideGeneralForumTopic } from '../../src/requests/hide-requests'
import { reopenGeneralForumTopic } from '../../src/requests/reopen-requests'
import { BOT_TOKEN, SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Hide Requests', () => {
  it('hides the general forum topic', async () => {
    let hide: boolean | FetchError

    hide = await hideGeneralForumTopic(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID })
    if (hide instanceof Error) throw hide

    expect(hide).toBeTruthy()

    await reopenGeneralForumTopic(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID })
  })
})