import { beforeAll } from 'vitest'
import { TelegramAPI } from '../src/apis/telegram-api'
import { TelegramFileAPI } from '../src/apis/telegram-file-api'
import { BOT_TOKEN } from './constants'

beforeAll(() => {
  TelegramAPI.setToken(BOT_TOKEN)
  TelegramFileAPI.setToken(BOT_TOKEN)
})
