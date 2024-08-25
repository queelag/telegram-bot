import type { FetchError } from '@aracna/core'
import type {
  AnswerCallbackQuery,
  AnswerInlineQuery,
  AnswerPreCheckoutQuery,
  AnswerShippingQuery,
  AnswerWebAppQuery,
  SentWebAppMessage
} from '@aracna/telegram-bot-types'
import { TelegramAPI } from '../apis/telegram-api'

export async function answerCallbackQuery(token: string, body: AnswerCallbackQuery): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, AnswerCallbackQuery>('answerCallbackQuery', body, { token })
}

export async function answerInlineQuery(token: string, body: AnswerInlineQuery): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, AnswerInlineQuery>('answerInlineQuery', body, { token })
}

export async function answerPreCheckoutQuery(token: string, body: AnswerPreCheckoutQuery): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, AnswerPreCheckoutQuery>('answerPreCheckoutQuery', body, { token })
}

export async function answerShippingQuery(token: string, body: AnswerShippingQuery): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, AnswerShippingQuery>('answerShippingQuery', body, { token })
}

export async function answerWebAppQuery(token: string, body: AnswerWebAppQuery): Promise<SentWebAppMessage | FetchError> {
  return TelegramAPI.post<SentWebAppMessage, AnswerWebAppQuery>('answerWebAppQuery', body, { token })
}
