import { FetchError } from '@aracna/core'
import { describe, expect, it } from 'vitest'
import { downloadFile, downloadUserFirstProfilePhoto } from '../../src/requests/download-requests'
import { PRIVATE_CHAT_ID } from '../../vitest/constants'

describe('Download Requests', () => {
  it.skip('downloads a file', async () => {
    let file: Blob | FetchError

    // needs a file_id

    file = await downloadFile('')
    if (file instanceof Error) throw file

    expect(file).toBeInstanceOf(Buffer)
  })

  it('downloads the first user profile photo', async () => {
    let photo: Blob | FetchError | Error

    photo = await downloadUserFirstProfilePhoto(PRIVATE_CHAT_ID)
    if (photo instanceof Error) throw photo

    expect(photo).toBeInstanceOf(Blob)
  })
})
