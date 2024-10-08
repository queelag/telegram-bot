import { FetchError, generateRandomString } from '@aracna/core'
import { ForumTopic } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { closeForumTopic, closeGeneralForumTopic } from '../../src/requests/close-requests'
import { createForumTopic } from '../../src/requests/create-requests'
import { deleteForumTopic } from '../../src/requests/delete-requests'
import { reopenForumTopic, reopenGeneralForumTopic } from '../../src/requests/reopen-requests'
import { SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Reopen Requests', () => {
  it('reopens a forum topic', async () => {
    let topic: ForumTopic | FetchError, close: boolean | FetchError, reopen: boolean | FetchError

    topic = await createForumTopic({ chat_id: SUPER_GROUP_CHAT_ID, name: generateRandomString() })
    if (topic instanceof Error) throw topic

    close = await closeForumTopic({ chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })

    if (close instanceof Error) {
      await deleteForumTopic({ chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })
      throw close
    }

    reopen = await reopenForumTopic({ chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })

    if (reopen instanceof Error) {
      await deleteForumTopic({ chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })
      throw reopen
    }

    expect(reopen).toBeTruthy()

    await deleteForumTopic({ chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })
  })

  it('reopens a general forum topic', async () => {
    let close: boolean | FetchError, reopen: boolean | FetchError

    close = await closeGeneralForumTopic({ chat_id: SUPER_GROUP_CHAT_ID })
    if (close instanceof Error) throw close

    reopen = await reopenGeneralForumTopic({ chat_id: SUPER_GROUP_CHAT_ID })
    if (reopen instanceof Error) throw reopen

    expect(reopen).toBeTruthy()
  })
})
