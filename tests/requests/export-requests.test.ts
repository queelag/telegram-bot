import { FetchError } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { exportChatInviteLink } from '../../src/requests/export-requests'
import { SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Export Requests', () => {
  it('exports the chat invite link', async () => {
    let link: string | FetchError

    link = await exportChatInviteLink({ chat_id: SUPER_GROUP_CHAT_ID })
    if (link instanceof Error) throw link

    expect(link).toBeTypeOf('string')
  })
})
