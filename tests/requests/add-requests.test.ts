import { FetchError, generateRandomString } from '@aracna/core'
import { afterAll, describe, expect, it } from 'vitest'
import { addStickerToSet } from '../../src/requests/add-requests'
import { createNewStickerSet } from '../../src/requests/create-requests'
import { deleteStickerSet } from '../../src/requests/delete-requests'
import { BOT_NAME, PRIVATE_CHAT_ID, SQUARE_512_WEBP } from '../../vitest/constants'

describe('Add Requests', () => {
  let names: string[] = []

  afterAll(async () => {
    for (let name of names) {
      await deleteStickerSet({ name })
    }
  })

  it('adds a sticker to a set', async () => {
    let name: string, create: boolean | FetchError, add: boolean | FetchError

    name = generateRandomString({ prefix: 'A', separator: '_', suffix: `by_${BOT_NAME}` })
    names.push(name)

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

    add = await addStickerToSet({
      name,
      sticker: {
        emoji_list: ['🔥'],
        format: 'static',
        sticker: new File([SQUARE_512_WEBP], 'sticker.png')
      },
      user_id: PRIVATE_CHAT_ID
    })
    if (add instanceof Error) throw add

    expect(add).toBe(true)
  })
})
