import { API, ObjectUtils } from '@queelag/core'
import { Message, Update } from '@queelag/telegram-types'
import { json } from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import { Server } from 'http'
import { UpdateType } from '../src/definitions/enums'
import { Telegram } from '../src/index'

describe('Telegram', () => {
  let e: Express, s: Server
  let telegram: Telegram, fake: API, check: boolean

  beforeAll(async () => {
    dotenv.config()

    e = express()
    e.use(cors())
    e.use(json())

    await new Promise<void>((r) => (s = e.listen(5000, () => r())))

    telegram = new Telegram(process.env.TOKEN || '', 'localhost')
    e.post('/bot' + telegram.token, (req: Request<any, any, Update>, res: Response) => {
      telegram.handle(req.body)
      res.status(200).send()
    })

    fake = new API('http://localhost:5000/bot' + process.env.TOKEN + '/')
  })

  it('registers handler', () => {
    telegram.on(UpdateType.MESSAGE, (context: Message) => (check = true), 'start')
    expect(ObjectUtils.get(telegram, 'handlers', []).length).toBe(1)
  })

  it('listens to telegram', async () => {
    await fake.post('', { message: { text: '/start' } })
    expect(check).toBeTruthy()
  })

  afterAll(async () => {
    await new Promise<void>((r) => s.close(() => r()))
  })
})
