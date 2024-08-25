import { TelegramAPI } from '../src/apis/telegram-api'

TelegramAPI.queue.setConcurrency(1).setDelay(1000)
