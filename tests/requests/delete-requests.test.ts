import { FetchError, generateRandomString } from '@aracna/core'
import { ForumTopic, Message, StickerSet } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { createForumTopic, createNewStickerSet } from '../../src/requests/create-requests'
import {
  deleteChatPhoto,
  deleteChatStickerSet,
  deleteForumTopic,
  deleteMessage,
  deleteMessages,
  deleteMyCommands,
  deleteStickerFromSet,
  deleteStickerSet
} from '../../src/requests/delete-requests'
import { getStickerSet } from '../../src/requests/get-requests'
import { sendMessage } from '../../src/requests/send-requests'
import { setChatPhoto } from '../../src/requests/set-requests'
import { BOT_NAME, BOT_TOKEN, PRIVATE_CHAT_ID, SQUARE_1024_WEBP, SQUARE_512_WEBP, SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Delete Requests', () => {
  it.skip('deletes a chat photo', async () => {
    let set: boolean | FetchError, del: boolean | FetchError

    // complains about image too small

    set = await setChatPhoto(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, photo: new File([SQUARE_1024_WEBP], 'photo.png') })
    if (set instanceof Error) throw set

    del = await deleteChatPhoto(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID })
    if (del instanceof Error) throw del

    expect(del).toBeTruthy()
  })

  it.skip('deletes a chat sticker set', async () => {
    let del: boolean | FetchError

    // complains about not enough participants

    del = await deleteChatStickerSet(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID })
    if (del instanceof Error) throw del

    expect(del).toBeTruthy()
  })

  it('deletes a forum topic', async () => {
    let topic: ForumTopic | FetchError, del: boolean | FetchError

    topic = await createForumTopic(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, name: generateRandomString() })
    if (topic instanceof Error) throw topic

    del = await deleteForumTopic(BOT_TOKEN, { chat_id: SUPER_GROUP_CHAT_ID, message_thread_id: topic.message_thread_id })
    if (del instanceof Error) throw del

    expect(del).toBeTruthy()
  })

  it('deletes a message', async () => {
    let message: Message | FetchError, del: boolean | FetchError

    message = await sendMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, text: generateRandomString() })
    if (message instanceof Error) throw message

    del = await deleteMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, message_id: message.message_id })
    if (del instanceof Error) throw del

    expect(del).toBeTruthy()
  })

  it('deletes multiple messages', async () => {
    let m1: Message | FetchError, m2: Message | FetchError, del: boolean | FetchError

    m1 = await sendMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, text: generateRandomString() })
    if (m1 instanceof Error) throw m1

    m2 = await sendMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, text: generateRandomString() })
    if (m2 instanceof Error) throw m2

    del = await deleteMessages(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, message_ids: [m1.message_id, m2.message_id] })
    if (del instanceof Error) throw del

    expect(del).toBeTruthy()
  })

  it('deletes my commands', async () => {
    let del: boolean | FetchError

    del = await deleteMyCommands(BOT_TOKEN, {})
    if (del instanceof Error) throw del

    expect(del).toBeTruthy()
  })

  it('deletes a sticker from a set', async () => {
    let name: string, create: boolean | FetchError, set: StickerSet | FetchError, del: boolean | FetchError

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

    try {
      set = await getStickerSet(BOT_TOKEN, { name })
      if (set instanceof Error) throw set

      del = await deleteStickerFromSet(BOT_TOKEN, { sticker: set.stickers[0].file_id })
      if (del instanceof Error) throw del

      expect(del).toBeTruthy()
    } catch (e) {
      await deleteStickerSet(BOT_TOKEN, { name })
      throw e
    }

    await deleteStickerSet(BOT_TOKEN, { name })
  })

  it('deletes a sticker set', async () => {
    let name: string, create: boolean | FetchError, del: boolean | FetchError

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

    del = await deleteStickerSet(BOT_TOKEN, { name })
    if (del instanceof Error) throw del

    expect(del).toBeTruthy()
  })
})
