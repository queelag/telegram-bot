import Telegram from '../src/index'
import { Message } from '@queelag/telegram-types'
import { HandlerType } from '../src/definitions/enum'
import { get } from 'lodash'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Server } from 'http'
import Axios, { AxiosInstance } from 'axios'

describe('Telegram', () => {
  let e: Express, s: Server
  let telegram: Telegram, fake: AxiosInstance, check: boolean

  beforeAll(async () => {
    dotenv.config()

    e = express()
    e.use(cors())
    e.use(bodyParser.json())
    await new Promise((r) => (s = e.listen(5000, () => r())))

    telegram = new Telegram(e, 'localhost', process.env.TOKEN)
    telegram.listen()

    fake = Axios.create({ baseURL: 'http://localhost:5000/bot' + process.env.TOKEN + '/' })
  })

  it('registers handler', () => {
    telegram.on('start', (context: Message) => (check = true), HandlerType.TEXT)
    expect(get(telegram, 'handlers').length).toBe(1)
  })

  it('listens to telegram', async () => {
    await fake.post('', { message: { text: '/start' } })
    expect(check).toBeTruthy()
  })

  afterAll(async () => {
    await new Promise((r) => s.close(() => r()))
  })
})
