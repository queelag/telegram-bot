import { FetchError, generateRandomString } from '@aracna/core'
import { Message, StickerSet } from '@aracna/telegram-bot-types'
import { afterAll, describe, expect, it } from 'vitest'
import { createNewStickerSet } from '../../src/requests/create-requests'
import { deleteChatStickerSet, deleteMessages, deleteStickerSet } from '../../src/requests/delete-requests'
import { getStickerSet } from '../../src/requests/get-requests'
import { sendMessage } from '../../src/requests/send-requests'
import {
  setChatAdministratorCustomTitle,
  setChatDescription,
  setChatMenuButton,
  setChatPermissions,
  setChatPhoto,
  setChatStickerSet,
  setChatTitle,
  setCustomEmojiStickerSetThumbnail,
  setGameScore,
  setMessageReaction,
  setMyCommands,
  setMyDefaultAdministratorRights,
  setMyDescription,
  setMyName,
  setPassportDataErrors,
  setStickerEmojiList,
  setStickerKeywords,
  setStickerMaskPosition,
  setStickerPositionInSet,
  setStickerSetThumbnail,
  setStickerSetTitle
} from '../../src/requests/set-requests'
import { BOT_ID, BOT_NAME, PRIVATE_CHAT_ID, SQUARE_512_WEBP, SUPER_GROUP_CHAT_ID } from '../../vitest/constants'

describe('Set Requests', () => {
  let messageIDs: number[] = []

  afterAll(async () => {
    await deleteMessages({ chat_id: PRIVATE_CHAT_ID, message_ids: messageIDs })
  })

  it.skip('sets the chat administrator custom title', async () => {
    let set: boolean | FetchError

    // need another user

    set = await setChatAdministratorCustomTitle({ chat_id: SUPER_GROUP_CHAT_ID, custom_title: generateRandomString(), user_id: BOT_ID })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it('sets the chat description', async () => {
    let set: boolean | FetchError

    set = await setChatDescription({ chat_id: SUPER_GROUP_CHAT_ID, description: generateRandomString() })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it('sets the chat menu button', async () => {
    let set: boolean | FetchError

    set = await setChatMenuButton({ chat_id: PRIVATE_CHAT_ID, menu_button: { type: 'default' } })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it('sets the chat permissions', async () => {
    let set: boolean | FetchError

    set = await setChatPermissions({ chat_id: SUPER_GROUP_CHAT_ID, permissions: {} })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it('sets the chat photo', async () => {
    let set: boolean | FetchError

    set = await setChatPhoto({ chat_id: SUPER_GROUP_CHAT_ID, photo: new File([SQUARE_512_WEBP], 'square.webp') })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it.skip('sets the chat sticker set', async () => {
    let name: string, create: boolean | FetchError, set: boolean | FetchError

    // PARTICIPANTS_TOO_FEW

    name = generateRandomString({ prefix: 'A', separator: '_', suffix: `by_${BOT_NAME}` })

    create = await createNewStickerSet({
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

    set = await setChatStickerSet({ chat_id: SUPER_GROUP_CHAT_ID, sticker_set_name: name })

    if (set instanceof Error) {
      await deleteStickerSet({ name })
      throw set
    }

    await deleteChatStickerSet({ chat_id: SUPER_GROUP_CHAT_ID })
    await deleteStickerSet({ name })

    expect(set).toBe(true)
  })

  it('sets the chat title', async () => {
    let set: boolean | FetchError

    set = await setChatTitle({ chat_id: SUPER_GROUP_CHAT_ID, title: generateRandomString() })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it.skip('sets the custom emoji sticker set thumbnail', async () => {
    let name: string, create: boolean | FetchError, set: boolean | FetchError

    //  the method can be used to set thumbnail only for custom emoji sticker sets'

    name = generateRandomString({ prefix: 'A', separator: '_', suffix: `by_${BOT_NAME}` })

    create = await createNewStickerSet({
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

    set = await setCustomEmojiStickerSetThumbnail({ custom_emoji_id: '⭐', name })

    if (set instanceof Error) {
      await deleteStickerSet({ name })
      throw set
    }

    await deleteStickerSet({ name })

    expect(set).toBe(true)
  })

  it.skip('sets the game score', async () => {
    let set: boolean | FetchError

    // needs a game

    set = await setGameScore({ chat_id: PRIVATE_CHAT_ID, score: 0, user_id: PRIVATE_CHAT_ID })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it('sets a message reaction', async () => {
    let message: Message | FetchError, set: boolean | FetchError

    message = await sendMessage({ chat_id: PRIVATE_CHAT_ID, text: generateRandomString() })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    set = await setMessageReaction({ chat_id: PRIVATE_CHAT_ID, message_id: message.message_id, reaction: [{ emoji: '❤️', type: 'emoji' }] })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it('sets my commands', async () => {
    let set: boolean | FetchError

    set = await setMyCommands({ commands: [] })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it('sets my default administrator rights', async () => {
    let set: boolean | FetchError

    set = await setMyDefaultAdministratorRights({
      rights: {
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
        can_post_messages: true,
        can_post_stories: true,
        can_promote_members: true,
        can_restrict_members: true,
        is_anonymous: false
      }
    })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it('sets my description', async () => {
    let set: boolean | FetchError

    set = await setMyDescription({ description: generateRandomString() })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it('sets my name', async () => {
    let set: boolean | FetchError

    set = await setMyName({ name: BOT_NAME })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it('sets my short description', async () => {
    let set: boolean | FetchError

    set = await setMyDescription({ description: generateRandomString() })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it('sets the passport data errors', async () => {
    let set: boolean | FetchError

    set = await setPassportDataErrors({ errors: [], user_id: PRIVATE_CHAT_ID })
    if (set instanceof Error) throw set

    expect(set).toBe(true)
  })

  it('sets a sticker emoji list', async () => {
    let name: string, create: boolean | FetchError, sticker: StickerSet | FetchError, set: boolean | FetchError

    name = generateRandomString({ prefix: 'A', separator: '_', suffix: `by_${BOT_NAME}` })

    create = await createNewStickerSet({
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

    sticker = await getStickerSet({ name })

    if (sticker instanceof Error) {
      await deleteStickerSet({ name })
      throw sticker
    }

    set = await setStickerEmojiList({
      emoji_list: ['🔥'],
      sticker: sticker.stickers[0].file_id
    })

    if (set instanceof Error) {
      await deleteStickerSet({ name })
      throw set
    }

    await deleteStickerSet({ name })

    expect(set).toBe(true)
  })

  it('sets a sticker keywords', async () => {
    let name: string, create: boolean | FetchError, sticker: StickerSet | FetchError, set: boolean | FetchError

    name = generateRandomString({ prefix: 'A', separator: '_', suffix: `by_${BOT_NAME}` })

    create = await createNewStickerSet({
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

    sticker = await getStickerSet({ name })

    if (sticker instanceof Error) {
      await deleteStickerSet({ name })
      throw sticker
    }

    set = await setStickerKeywords({
      keywords: [generateRandomString()],
      sticker: sticker.stickers[0].file_id
    })

    if (set instanceof Error) {
      await deleteStickerSet({ name })
      throw set
    }

    await deleteStickerSet({ name })

    expect(set).toBe(true)
  })

  it.skip('sets a sticker mask position', async () => {
    let name: string, create: boolean | FetchError, sticker: StickerSet | FetchError, set: boolean | FetchError

    name = generateRandomString({ prefix: 'A', separator: '_', suffix: `by_${BOT_NAME}` })

    create = await createNewStickerSet({
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

    sticker = await getStickerSet({ name })

    if (sticker instanceof Error) {
      await deleteStickerSet({ name })
      throw sticker
    }

    // STICKER_MASK_COORDS_NOT_SUPPORTED

    set = await setStickerMaskPosition({
      mask_position: {
        point: 'chin',
        scale: 1,
        x_shift: 1,
        y_shift: 1
      },
      sticker: sticker.stickers[0].file_id
    })

    if (set instanceof Error) {
      await deleteStickerSet({ name })
      throw set
    }

    await deleteStickerSet({ name })

    expect(set).toBe(true)
  })

  it('sets a sticker position in set', async () => {
    let name: string, create: boolean | FetchError, sticker: StickerSet | FetchError, set: boolean | FetchError

    name = generateRandomString({ prefix: 'A', separator: '_', suffix: `by_${BOT_NAME}` })

    create = await createNewStickerSet({
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

    sticker = await getStickerSet({ name })

    if (sticker instanceof Error) {
      await deleteStickerSet({ name })
      throw sticker
    }

    set = await setStickerPositionInSet({
      position: 0,
      sticker: sticker.stickers[0].file_id
    })

    if (set instanceof Error) {
      await deleteStickerSet({ name })
      throw set
    }

    await deleteStickerSet({ name })

    expect(set).toBe(true)
  })

  it.skip('sets a sticker set thumbnail', async () => {
    let name: string, create: boolean | FetchError, set: boolean | FetchError

    name = generateRandomString({ prefix: 'A', separator: '_', suffix: `by_${BOT_NAME}` })

    create = await createNewStickerSet({
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

    set = await setStickerSetThumbnail({
      format: 'static',
      name,
      thumbnail: new File([SQUARE_512_WEBP], 'square.webp'),
      user_id: PRIVATE_CHAT_ID
    })

    if (set instanceof Error) {
      await deleteStickerSet({ name })
      throw set
    }

    await deleteStickerSet({ name })

    expect(set).toBe(true)
  })

  it('sets a sticker set title', async () => {
    let name: string, create: boolean | FetchError, set: boolean | FetchError

    name = generateRandomString({ prefix: 'A', separator: '_', suffix: `by_${BOT_NAME}` })

    create = await createNewStickerSet({
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

    set = await setStickerSetTitle({ name, title: generateRandomString() })

    if (set instanceof Error) {
      await deleteStickerSet({ name })
      throw set
    }

    await deleteStickerSet({ name })

    expect(set).toBe(true)
  })
})
