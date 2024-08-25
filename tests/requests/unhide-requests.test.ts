import { FetchError } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { hideGeneralForumTopic } from '../../src/requests/hide-requests'
import { unhideGeneralForumTopic } from '../../src/requests/unhide-requests'
import { BOT_TOKEN, SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Unhide Requests', () => {
  it('unhides the general forum topic', async () => {
    let hide: boolean | FetchError, unhide: boolean | FetchError

    hide = await hideGeneralForumTopic(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID })
    if (hide instanceof Error) throw hide

    unhide = await unhideGeneralForumTopic(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID })
    if (unhide instanceof Error) throw unhide

    expect(unhide).toBeTruthy()
  })
})
