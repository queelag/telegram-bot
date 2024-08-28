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
import type { TelegramApiConfig } from '../definitions/interfaces'

export async function answerCallbackQuery(body: AnswerCallbackQuery, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, AnswerCallbackQuery>('answerCallbackQuery', body, config)
}

export async function answerInlineQuery(body: AnswerInlineQuery, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, AnswerInlineQuery>('answerInlineQuery', body, config)
}

export async function answerPreCheckoutQuery(body: AnswerPreCheckoutQuery, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, AnswerPreCheckoutQuery>('answerPreCheckoutQuery', body, config)
}

export async function answerShippingQuery(body: AnswerShippingQuery, config?: TelegramApiConfig): Promise<boolean | FetchError> {
  return TelegramAPI.post<boolean, AnswerShippingQuery>('answerShippingQuery', body, config)
}

export async function answerWebAppQuery(body: AnswerWebAppQuery, config?: TelegramApiConfig): Promise<SentWebAppMessage | FetchError> {
  return TelegramAPI.post<SentWebAppMessage, AnswerWebAppQuery>('answerWebAppQuery', body, config)
}
