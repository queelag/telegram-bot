import { encodeText, FetchError, generateRandomString } from '@aracna/core'
import { Message } from '@aracna/telegram-bot-types'
import { afterAll, describe, expect, it } from 'vitest'
import { deleteMessages } from '../../src/requests/delete-requests'
import {
  sendAnimation,
  sendAudio,
  sendChatAction,
  sendContact,
  sendDice,
  sendDocument,
  sendGame,
  sendInvoice,
  sendLocation,
  sendMediaGroup,
  sendMessage,
  sendMessageHTML,
  sendPaidMedia,
  sendPhoto,
  sendPoll,
  sendRepliableMessage,
  sendSticker,
  sendVenue,
  sendVideo,
  sendVideoNote,
  sendVoice
} from '../../src/requests/send-requests'
import { AUDIO_MP3, BOT_TOKEN, PRIVATE_CHAT_ID, SQUARE_512_GIF, SQUARE_512_WEBP, STRIPE_TOKEN, VIDEO_MP4 } from '../../vitest/constants'

describe('Send Requests', () => {
  let messageIDs: number[] = []

  afterAll(async () => {
    await deleteMessages(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, message_ids: messageIDs })
  })

  it('sends an animation', async () => {
    let message: Message | FetchError

    message = await sendAnimation(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, animation: new File([SQUARE_512_GIF], 'square.gif') })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends an audio', async () => {
    let message: Message | FetchError

    message = await sendAudio(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, audio: new File([AUDIO_MP3], 'audio.mp3') })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends a document', async () => {
    let message: Message | FetchError

    message = await sendDocument(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, document: new File([encodeText('a')], 'document.txt') })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends a chat action', async () => {
    let action: boolean | FetchError

    action = await sendChatAction(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, action: 'typing' })
    if (action instanceof Error) throw action

    expect(action).toBe(true)
  })

  it('sends a contact', async () => {
    let message: Message | FetchError

    message = await sendContact(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, first_name: 'John', phone_number: '+1 (177) 529-6883' })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends a dice', async () => {
    let message: Message | FetchError

    message = await sendDice(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID })
    if (message instanceof Error) throw message

    //messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends a game', async () => {
    let message: Message | FetchError

    message = await sendGame(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, game_short_name: 'game' })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends an invoice', async () => {
    let message: Message | FetchError

    message = await sendInvoice(BOT_TOKEN, {
      chat_id: PRIVATE_CHAT_ID,
      currency: 'EUR',
      description: generateRandomString(),
      payload: generateRandomString(),
      prices: [{ label: generateRandomString(), amount: 50 }],
      provider_token: STRIPE_TOKEN,
      title: generateRandomString()
    })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends a location', async () => {
    let message: Message | FetchError

    message = await sendLocation(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, latitude: 0, longitude: 0 })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends a media group', async () => {
    let messages: Message[] | FetchError

    messages = await sendMediaGroup(BOT_TOKEN, {
      chat_id: PRIVATE_CHAT_ID,
      media: [
        { type: 'photo', media: new File([SQUARE_512_WEBP], 'square-1.webp') },
        { type: 'photo', media: new File([SQUARE_512_WEBP], 'square-2.webp') }
      ]
    })
    if (messages instanceof Error) throw messages

    messageIDs.push(...messages.map((message) => message.message_id))

    for (let message of messages) {
      expect(message.message_id).toBeTypeOf('number')
    }
  })

  it('sends a message', async () => {
    let message: Message | FetchError

    message = await sendMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, text: generateRandomString() })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends a html message', async () => {
    let message: Message | FetchError

    message = await sendMessageHTML(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, text: `<b>${generateRandomString()}</b>` })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends a paid media', async () => {
    let message: Message | FetchError

    message = await sendPaidMedia(BOT_TOKEN, {
      chat_id: PRIVATE_CHAT_ID,
      media: [
        { type: 'photo', media: new File([SQUARE_512_WEBP], 'square-1.webp') },
        { type: 'photo', media: new File([SQUARE_512_WEBP], 'square-2.webp') }
      ],
      star_count: 10
    })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends a photo', async () => {
    let message: Message | FetchError

    message = await sendPhoto(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, photo: new File([SQUARE_512_WEBP], 'square.webp') })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends a poll', async () => {
    let message: Message | FetchError

    message = await sendPoll(BOT_TOKEN, {
      chat_id: PRIVATE_CHAT_ID,
      options: [{ text: generateRandomString() }, { text: generateRandomString() }],
      question: generateRandomString()
    })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends a repliable message', async () => {
    let message: Message | FetchError

    message = await sendRepliableMessage(BOT_TOKEN, {
      chat_id: PRIVATE_CHAT_ID,
      data: 0,
      text: generateRandomString(),
      type: generateRandomString()
    })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends a sticker', async () => {
    let message: Message | FetchError

    message = await sendSticker(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, sticker: new File([SQUARE_512_WEBP], 'square.webp') })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it('sends a venue', async () => {
    let message: Message | FetchError

    message = await sendVenue(BOT_TOKEN, {
      chat_id: PRIVATE_CHAT_ID,
      address: generateRandomString(),
      latitude: 0,
      longitude: 0,
      title: generateRandomString()
    })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it.skip('sends a video', async () => {
    let message: Message | FetchError

    message = await sendVideo(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, video: new File([VIDEO_MP4], 'video.mp4') })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it.skip('sends a video note', async () => {
    let message: Message | FetchError

    message = await sendVideoNote(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, video_note: new File([VIDEO_MP4], 'video.mp4') })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })

  it.skip('sends a voice', async () => {
    let message: Message | FetchError

    message = await sendVoice(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, voice: new File([AUDIO_MP3], 'audio.mp3') })
    if (message instanceof Error) throw message

    messageIDs.push(message.message_id)

    expect(message.message_id).toBeTypeOf('number')
  })
})
