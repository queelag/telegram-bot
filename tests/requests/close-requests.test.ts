import { FetchError, generateRandomString } from '@aracna/core'
import { ForumTopic } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { closeForumTopic, closeGeneralForumTopic } from '../../src/requests/close-requests'
import { createForumTopic } from '../../src/requests/create-requests'
import { deleteForumTopic } from '../../src/requests/delete-requests'
import { reopenGeneralForumTopic } from '../../src/requests/reopen-requests'
import { SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Close Requests', () => {
  it('closes a forum topic', async () => {
    let topic: ForumTopic | FetchError, close: boolean | FetchError

    topic = await createForumTopic({ chat_id: SUPER_GROUP_CHAT_ID, name: generateRandomString() })
    if (topic instanceof Error) throw topic

    close = await closeForumTopic({ chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })

    if (close instanceof Error) {
      await deleteForumTopic({ chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })
      throw close
    }

    expect(close).toBeTruthy()

    await deleteForumTopic({ chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })
  })

  it('closes a general forum topic', async () => {
    let close: boolean | FetchError

    close = await closeGeneralForumTopic({ chat_id: SUPER_GROUP_CHAT_ID })
    if (close instanceof Error) throw close

    expect(close).toBeTruthy()

    await reopenGeneralForumTopic({ chat_id: SUPER_GROUP_CHAT_ID })
  })
})
