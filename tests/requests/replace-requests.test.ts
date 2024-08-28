import { FetchError, generateRandomString } from '@aracna/core'
import { StickerSet } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { createNewStickerSet } from '../../src/requests/create-requests'
import { deleteStickerSet } from '../../src/requests/delete-requests'
import { getStickerSet } from '../../src/requests/get-requests'
import { replaceStickerInSet } from '../../src/requests/replace-requests'
import { BOT_NAME, PRIVATE_CHAT_ID, SQUARE_512_WEBP } from '../../vitest/constants'

describe('Replace Requests', () => {
  it.skip('replaces a sticker in a set', async () => {
    let name: string, create: boolean | FetchError, set: StickerSet | FetchError, replace: boolean | FetchError

    name = generateRandomString({ prefix: 'A', separator: '_', suffix: `by_${BOT_NAME}` })

    create = await createNewStickerSet({
      name,
      stickers: [
        {
          emoji_list: ['⭐'],
          format: 'static',
          sticker: new File([SQUARE_512_WEBP], 'square.webp')
        }
      ],
      title: generateRandomString(),
      user_id: PRIVATE_CHAT_ID
    })
    if (create instanceof Error) throw create

    set = await getStickerSet({ name })

    if (set instanceof Error) {
      await deleteStickerSet({ name })
      throw set
    }

    // the old sticker isn't from the set

    replace = await replaceStickerInSet({
      name,
      old_sticker: set.stickers[0].file_id,
      sticker: {
        emoji_list: ['🔥'],
        format: 'static',
        sticker: new File([SQUARE_512_WEBP], 'square.webp')
      },
      user_id: PRIVATE_CHAT_ID
    })

    if (replace instanceof Error) {
      await deleteStickerSet({ name })
      throw replace
    }

    expect(replace).toBeTruthy()

    await deleteStickerSet({ name })
  })
})
