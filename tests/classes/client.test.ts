import { DeferredPromise, Fetch, FetchError, generateRandomString, parseNumber } from '@aracna/core'
import { Update } from '@aracna/telegram-bot-types'
import { authtoken, forward, Listener } from '@ngrok/ngrok'
import { fastify, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { Client } from '../../src/classes/client'
import { CallbackQueryBody, Context, ReplyToMessageBody, StartBody } from '../../src/definitions/interfaces'
import { sendMessage } from '../../src/requests/send-requests'
import { encodeCallbackQueryBody } from '../../src/utils/callback-query-utils'
import { encodeReplyToMessageBody, encodeReplyToMessageBodyToURL } from '../../src/utils/reply-to-message-utils'
import { encodeStartBodyToText } from '../../src/utils/start-message-utils'
import { BOT_ID, BOT_TOKEN, NGROK_AUTH_TOKEN, PRIVATE_CHAT_ID } from '../../vitest/constants'

describe('Client', () => {
  let client: Client, server: FastifyInstance, serverURL: string, listener: Listener, listenerURL: string

  async function sendUpdate(update: Omit<Update, 'update_id'>): Promise<void> {
    await Fetch.post(serverURL, { ...update, update_id: 0 })
  }

  beforeAll(async () => {
    client = new Client(BOT_TOKEN)
    server = fastify()

    server.post('*', async (req: FastifyRequest, res: FastifyReply) => {
      client.handle(req.body as Update)
      res.send({ ok: true })
    })

    serverURL = await server.listen()

    await authtoken(NGROK_AUTH_TOKEN)

    listener = await forward({ port: parseNumber(new URL(serverURL).port) })
    listenerURL = listener.url() ?? ''
  })

  afterEach(async () => {
    await client.disconnect()
  })

  afterAll(async () => {
    await listener.close()
    await server.close()
  })

  it('connects with polling and receives updates', async () => {
    let promise: DeferredPromise<Context['message']>

    promise = new DeferredPromise()

    client.on('message', promise.resolve)

    await client.connect('polling', { polling: { allowed_updates: ['message'] } })

    await sendMessage(BOT_TOKEN, { chat_id: PRIVATE_CHAT_ID, text: generateRandomString() })

    await promise.instance
  })

  it('connects with webhook and receives updates', async () => {
    let promise: DeferredPromise<Context['message']>, connect: void | FetchError | Error

    promise = new DeferredPromise()

    client.on('message', promise.resolve)

    connect = await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })
    if (connect instanceof Error) throw connect

    await sendUpdate({
      message: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0,
        text: generateRandomString()
      }
    })

    await promise.instance
  })

  it('handles the "business_connection" update', async () => {
    let promise: DeferredPromise<Context['business_connection']>

    promise = new DeferredPromise()
    client.on('business_connection', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      business_connection: {
        can_reply: true,
        date: Date.now(),
        id: generateRandomString(),
        is_enabled: true,
        user: { first_name: '', is_bot: true, id: BOT_ID },
        user_chat_id: PRIVATE_CHAT_ID
      }
    })

    await promise.instance
  })

  it('handles the "business_message" update', async () => {
    let promise: DeferredPromise<Context['business_message']>

    promise = new DeferredPromise()
    client.on('business_message', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      business_message: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0
      }
    })

    await promise.instance
  })

  it('handles the "callback_query" update', async () => {
    let promise: DeferredPromise<Context['callback_query']>

    promise = new DeferredPromise()
    client.on('callback_query', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      callback_query: {
        chat_instance: generateRandomString(),
        data: encodeCallbackQueryBody(),
        from: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false },
        id: generateRandomString()
      }
    })

    await promise.instance
  })

  it('handles the "callback_query" update with command', async () => {
    let promise: DeferredPromise<Context['callback_query']>, body: CallbackQueryBody

    promise = new DeferredPromise()
    client.on('callback_query', promise.resolve, { command: 'query' })

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    body = {
      d: generateRandomString(),
      m: 'query'
    }

    await sendUpdate({
      callback_query: {
        chat_instance: generateRandomString(),
        data: encodeCallbackQueryBody({ command: body.m, data: body.d }),
        from: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false },
        id: generateRandomString()
      }
    })

    await promise.instance

    expect(promise.value?.body).toStrictEqual(body)
  })

  it('handles the "channel_post" update', async () => {
    let promise: DeferredPromise<Context['channel_post']>

    promise = new DeferredPromise()
    client.on('channel_post', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      channel_post: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0
      }
    })

    await promise.instance
  })

  it('handles the "chat_boost" update', async () => {
    let promise: DeferredPromise<Context['chat_boost']>

    promise = new DeferredPromise()
    client.on('chat_boost', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      chat_boost: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        boost: {
          add_date: Date.now(),
          boost_id: generateRandomString(),
          expiration_date: Date.now(),
          source: { source: '', user: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false } }
        }
      }
    })

    await promise.instance
  })

  it('handles the "chat_join_request" update', async () => {
    let promise: DeferredPromise<Context['chat_join_request']>

    promise = new DeferredPromise()
    client.on('chat_join_request', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      chat_join_request: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        from: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false },
        user_chat_id: PRIVATE_CHAT_ID
      }
    })

    await promise.instance
  })

  it('handles the "chat_member" update', async () => {
    let promise: DeferredPromise<Context['chat_member']>

    promise = new DeferredPromise()
    client.on('chat_member', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      chat_member: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        from: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false },
        new_chat_member: { status: 'user', user: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false } },
        old_chat_member: { status: 'user', user: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false } }
      }
    })

    await promise.instance
  })

  it('handles the "chosen_inline_result" update', async () => {
    let promise: DeferredPromise<Context['chosen_inline_result']>

    promise = new DeferredPromise()
    client.on('chosen_inline_result', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      chosen_inline_result: {
        from: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false },
        query: generateRandomString(),
        result_id: generateRandomString()
      }
    })

    await promise.instance
  })

  it('handles the "deleted_business_messages" update', async () => {
    let promise: DeferredPromise<Context['deleted_business_messages']>

    promise = new DeferredPromise()
    client.on('deleted_business_messages', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      deleted_business_messages: {
        business_connection_id: generateRandomString(),
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        message_ids: []
      }
    })

    await promise.instance
  })

  it('handles the "edited_business_message" update', async () => {
    let promise: DeferredPromise<Context['edited_business_message']>

    promise = new DeferredPromise()
    client.on('edited_business_message', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      edited_business_message: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0
      }
    })

    await promise.instance
  })

  it('handles the "edited_channel_post" update', async () => {
    let promise: DeferredPromise<Context['edited_channel_post']>

    promise = new DeferredPromise()
    client.on('edited_channel_post', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      edited_channel_post: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0
      }
    })

    await promise.instance
  })

  it('handles the "edited_message" update', async () => {
    let promise: DeferredPromise<Context['edited_message']>

    promise = new DeferredPromise()
    client.on('edited_message', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      edited_message: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0
      }
    })

    await promise.instance
  })

  it('handles the "inline_query" update', async () => {
    let promise: DeferredPromise<Context['inline_query']>

    promise = new DeferredPromise()
    client.on('inline_query', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      inline_query: {
        from: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false },
        id: generateRandomString(),
        offset: generateRandomString(),
        query: generateRandomString()
      }
    })

    await promise.instance
  })

  it('handles the "message" update', async () => {
    let promise: DeferredPromise<Context['message']>

    promise = new DeferredPromise()
    client.on('message', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      message: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0
      }
    })

    await promise.instance
  })

  it('handles the "message_reaction" update', async () => {
    let promise: DeferredPromise<Context['message_reaction']>

    promise = new DeferredPromise()
    client.on('message_reaction', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      message_reaction: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0,
        new_reaction: [],
        old_reaction: []
      }
    })

    await promise.instance
  })

  it('handles the "message_reaction_count" update', async () => {
    let promise: DeferredPromise<Context['message_reaction_count']>

    promise = new DeferredPromise()
    client.on('message_reaction_count', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      message_reaction_count: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0,
        reactions: []
      }
    })

    await promise.instance
  })

  it('handles the "my_chat_member" update', async () => {
    let promise: DeferredPromise<Context['my_chat_member']>

    promise = new DeferredPromise()
    client.on('my_chat_member', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      my_chat_member: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        from: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false },
        new_chat_member: { status: 'user', user: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false } },
        old_chat_member: { status: 'user', user: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false } }
      }
    })

    await promise.instance
  })

  it('handles the "poll" update', async () => {
    let promise: DeferredPromise<Context['poll']>

    promise = new DeferredPromise()
    client.on('poll', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      poll: {
        allows_multiple_answers: false,
        id: generateRandomString(),
        is_anonymous: false,
        is_closed: false,
        options: [],
        question: generateRandomString(),
        total_voter_count: 0,
        type: 'regular'
      }
    })

    await promise.instance
  })

  it('handles the "poll_answer" update', async () => {
    let promise: DeferredPromise<Context['poll_answer']>

    promise = new DeferredPromise()
    client.on('poll_answer', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      poll_answer: {
        option_ids: [],
        poll_id: generateRandomString(),
        user: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false }
      }
    })

    await promise.instance
  })

  it('handles the "pre_checkout_query" update', async () => {
    let promise: DeferredPromise<Context['pre_checkout_query']>

    promise = new DeferredPromise()
    client.on('pre_checkout_query', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      pre_checkout_query: {
        currency: generateRandomString(),
        from: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false },
        id: generateRandomString(),
        invoice_payload: generateRandomString(),
        total_amount: 0
      }
    })

    await promise.instance
  })

  it('handles the "removed_chat_boost" update', async () => {
    let promise: DeferredPromise<Context['removed_chat_boost']>

    promise = new DeferredPromise()
    client.on('removed_chat_boost', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      removed_chat_boost: {
        boost_id: generateRandomString(),
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        remove_date: Date.now(),
        source: { source: 'premium', user: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false } }
      }
    })

    await promise.instance
  })

  it('handles the "reply_to_message" update', async () => {
    let promise: DeferredPromise<Context['reply_to_message']>, body: ReplyToMessageBody

    promise = new DeferredPromise()
    client.on('reply_to_message', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    body = {
      d: generateRandomString()
    }

    await sendUpdate({
      message: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0,
        reply_to_message: {
          chat: { id: PRIVATE_CHAT_ID, type: 'private' },
          date: Date.now(),
          message_id: 0,
          text: encodeReplyToMessageBody(body.d)
        }
      }
    })

    await promise.instance
  })

  it('handles the "reply_to_message" update with command', async () => {
    let promise: DeferredPromise<Context['reply_to_message']>, body: ReplyToMessageBody

    promise = new DeferredPromise()
    client.on('reply_to_message', promise.resolve, { command: 'reply' })

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    body = {
      d: generateRandomString(),
      m: 'reply'
    }

    await sendUpdate({
      message: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0,
        reply_to_message: {
          chat: { id: PRIVATE_CHAT_ID, type: 'private' },
          date: Date.now(),
          entities: [
            {
              length: 0,
              offset: 0,
              type: 'url',
              url: encodeReplyToMessageBodyToURL({ command: body.m, data: body.d })
            }
          ],
          message_id: 0
        }
      }
    })

    await promise.instance
  })

  it('handles the "shipping_query" update', async () => {
    let promise: DeferredPromise<Context['shipping_query']>

    promise = new DeferredPromise()
    client.on('shipping_query', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      shipping_query: {
        from: { first_name: '', id: PRIVATE_CHAT_ID, is_bot: false },
        id: generateRandomString(),
        invoice_payload: generateRandomString(),
        shipping_address: { city: '', country_code: '', state: '', street_line1: '', street_line2: '', post_code: '' }
      }
    })

    await promise.instance
  })

  it('handles the "start" update', async () => {
    let promise: DeferredPromise<Context['start']>

    promise = new DeferredPromise()
    client.on('start', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    await sendUpdate({
      message: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0,
        text: '/start'
      }
    })

    await promise.instance
  })

  it('handles the "start" update with body', async () => {
    let promise: DeferredPromise<Context['start']>, body: StartBody

    promise = new DeferredPromise()
    client.on('start', promise.resolve)

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    body = {}

    await sendUpdate({
      message: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0,
        text: encodeStartBodyToText()
      }
    })

    await promise.instance

    expect(promise.value?.body).toStrictEqual(body)
  })

  it('handles the "start" update with body and command', async () => {
    let promise: DeferredPromise<Context['start']>, body: StartBody

    promise = new DeferredPromise()
    client.on('start', promise.resolve, { command: 'alt_start' })

    await client.connect('webhook', { webhook: { allowed_updates: ['message'], url: listenerURL } })

    body = {
      d: generateRandomString(),
      m: 'alt_start'
    }

    await sendUpdate({
      message: {
        chat: { id: PRIVATE_CHAT_ID, type: 'private' },
        date: Date.now(),
        message_id: 0,
        text: encodeStartBodyToText({ command: body.m, data: body.d })
      }
    })

    await promise.instance

    expect(promise.value?.body).toStrictEqual(body)
  })
})
