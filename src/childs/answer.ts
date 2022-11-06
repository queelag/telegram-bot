import { FetchError } from '@queelag/core'
import { AnswerCallbackQuery, AnswerInlineQuery, AnswerPreCheckoutQuery, AnswerShippingQuery, InlineQueryResult } from '@queelag/telegram-bot-types'
import { Child } from '../modules/child'

export class Answer extends Child {
  async callbackQuery(id: string, parameters?: Partial<AnswerCallbackQuery>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, AnswerCallbackQuery>('answerCallbackQuery', { callback_query_id: id, ...parameters })
  }

  async inlineQuery(id: string, results: InlineQueryResult[], parameters?: Partial<AnswerInlineQuery>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, AnswerInlineQuery>('answerInlineQuery', { inline_query_id: id, results: results, ...parameters })
  }

  async preCheckoutQuery(id: string, ok: boolean, parameters?: Partial<AnswerPreCheckoutQuery>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, AnswerPreCheckoutQuery>('answerPreCheckoutQuery', { ok: ok, pre_checkout_query_id: id, ...parameters })
  }

  async shippingQuery(id: string, ok: boolean, parameters?: Partial<AnswerShippingQuery>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, AnswerShippingQuery>('answerShippingQuery', { ok: ok, shipping_query_id: id, ...parameters })
  }
}
