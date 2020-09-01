import { AnswerCallbackQuery, AnswerInlineQuery, AnswerPreCheckoutQuery, AnswerShippingQuery, InlineQueryResult } from '@queelag/telegram-types'
import Child from '../modules/child'

class Answer extends Child {
  async callbackQuery(id: string, parameters?: Partial<AnswerCallbackQuery>): Promise<boolean | Error> {
    return this.telegram.api.post<AnswerCallbackQuery, boolean>('answerCallbackQuery', { callback_query_id: id, ...parameters })
  }

  async inlineQuery(id: string, results: InlineQueryResult[], parameters?: Partial<AnswerInlineQuery>): Promise<boolean | Error> {
    return this.telegram.api.post<AnswerInlineQuery, boolean>('answerInlineQuery', { inline_query_id: id, results: results, ...parameters })
  }

  async shippingQuery(id: string, ok: boolean, parameters?: Partial<AnswerShippingQuery>): Promise<boolean | Error> {
    return this.telegram.api.post<AnswerShippingQuery, boolean>('answerShippingQuery', { shipping_query_id: id, ok: ok, ...parameters })
  }

  async preCheckoutQuery(id: string, ok: boolean, parameters?: Partial<AnswerPreCheckoutQuery>): Promise<boolean | Error> {
    return this.telegram.api.post<AnswerPreCheckoutQuery, boolean>('answerPreCheckoutQuery', { pre_checkout_query_id: id, ok: ok, ...parameters })
  }
}

export default Answer
