import { FetchError } from '@aracna/core'
import { File as TelegramFile } from '@aracna/telegram-bot-types'
import { describe, expect, it } from 'vitest'
import { uploadStickerFile } from '../../src/requests/upload-requests'
import { PRIVATE_CHAT_ID, SQUARE_512_WEBP } from '../../vitest/constants'

describe('Upload Requests', () => {
  it('uploads a sticker file', async () => {
    let upload: TelegramFile | FetchError

    upload = await uploadStickerFile({
      sticker: new File([SQUARE_512_WEBP], 'square.webp'),
      sticker_format: 'static',
      user_id: PRIVATE_CHAT_ID
    })
    if (upload instanceof Error) throw upload

    expect(upload.file_id).toBeTypeOf('string')
  })
})
