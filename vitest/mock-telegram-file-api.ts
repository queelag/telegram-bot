import { fastifyMultipart } from '@fastify/multipart'
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { afterAll, beforeAll } from 'vitest'
import { TelegramFileAPI } from '../src/apis/telegram-file-api'
import { BOT_TOKEN, SQUARE_512_WEBP } from './constants'

let app: FastifyInstance

beforeAll(async () => {
  let url: string

  app = fastify()
  app.register(fastifyMultipart)

  app.get('/file/bot:token/:path', async (req: FastifyRequest, res: FastifyReply) => {
    const token: string = req.params?.['token']
    const path: string = req.params?.['path']

    if (token !== BOT_TOKEN) {
      return res.status(401).send({ ok: false })
    }

    return res.send(SQUARE_512_WEBP)
  })

  url = await app.listen()
  TelegramFileAPI.setBaseURL(url)
})

afterAll(async () => {
  await app.close()
})
