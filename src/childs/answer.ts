import { FetchError } from '@queelag/core'
import { AnswerCallbackQuery, AnswerInlineQuery, AnswerPreCheckoutQuery, AnswerShippingQuery, InlineQueryResult } from '@queelag/telegram-types'
import { Child } from '../modules/child'

export class Answer extends Child {
  async callbackQuery(id: string, parameters?: Partial<AnswerCallbackQuery>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, AnswerCallbackQuery>('answerCallbackQuery', { callback_query_id: id, ...parameters })
  }

  async inlineQuery(id: string, results: InlineQueryResult[], parameters?: Partial<AnswerInlineQuery>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, AnswerInlineQuery>('answerInlineQuery', { inline_query_id: id, results: results, ...parameters })
  }

  async shippingQuery(id: string, ok: boolean, parameters?: Partial<AnswerShippingQuery>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, AnswerShippingQuery>('answerShippingQuery', { shipping_query_id: id, ok: ok, ...parameters })
  }

  async preCheckoutQuery(id: string, ok: boolean, parameters?: Partial<AnswerPreCheckoutQuery>): Promise<boolean | FetchError> {
    return this.telegram.api.post<boolean, AnswerPreCheckoutQuery>('answerPreCheckoutQuery', { pre_checkout_query_id: id, ok: ok, ...parameters })
  }
}
