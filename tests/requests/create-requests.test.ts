import { FetchError, generateRandomString } from '@aracna/core'
import { ChatInviteLink, ForumTopic } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import {
  createChatInviteLink,
  createChatSubscriptionInviteLink,
  createForumTopic,
  createInvoiceLink,
  createNewStickerSet
} from '../../src/requests/create-requests'
import { deleteForumTopic, deleteStickerSet } from '../../src/requests/delete-requests'
import { BOT_ID, BOT_NAME, BOT_TOKEN, PRIVATE_CHAT_ID, SQUARE_512_WEBP, STRIPE_TOKEN, SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Create Requests', () => {
  it('creates a chat invite link', async () => {
    let link: ChatInviteLink | FetchError

    link = await createChatInviteLink(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID })
    if (link instanceof Error) throw link

    expect(link.creator.id).toBe(BOT_ID)
    expect(link.invite_link).toBeTypeOf('string')
  })

  it.skip('creates a chat subscription invite link', async () => {
    let link: ChatInviteLink | FetchError

    // needs an exclusive channel

    link = await createChatSubscriptionInviteLink(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, subscription_period: 2592000, subscription_price: 1 })
    if (link instanceof Error) throw link

    expect(link.creator.id).toBe(BOT_ID)
    expect(link.invite_link).toBeTypeOf('string')
  })

  it('creates a forum topic', async () => {
    let topic: ForumTopic | FetchError

    topic = await createForumTopic(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, name: generateRandomString() })
    if (topic instanceof Error) throw topic

    await deleteForumTopic(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })
  })

  it('creates an invoice link', async () => {
    let link: string | FetchError

    link = await createInvoiceLink(BOT_TOKEN, {
      currency: 'EUR',
      description: generateRandomString(),
      payload: generateRandomString(),
      prices: [{ label: generateRandomString(), amount: 50 }],
      provider_token: STRIPE_TOKEN,
      title: generateRandomString()
    })
    if (link instanceof Error) throw link

    expect(link).toBeTypeOf('string')
  })

  it('creates a new sticker set', async () => {
    let name: string, create: boolean | FetchError

    name = generateRandomString({ prefix: 'A', separator: '_', suffix: `by_${BOT_NAME}` })

    create = await createNewStickerSet(BOT_TOKEN, {
      name,
      stickers: [
        {
          emoji_list: ['⭐'],
          format: 'static',
          sticker: new File([SQUARE_512_WEBP], 'sticker.png')
        }
      ],
      title: generateRandomString(),
      user_id: PRIVATE_CHAT_ID
    })
    if (create instanceof Error) throw create

    await deleteStickerSet(BOT_TOKEN, { name })
  })
})
