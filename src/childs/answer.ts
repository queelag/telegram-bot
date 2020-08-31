import Child from '../modules/child'
import { AnswerCallbackQuery, InlineQueryResult, AnswerInlineQuery, AnswerShippingQuery, AnswerPreCheckoutQuery } from '@queelag/telegram-types'

class Answer extends Child {
  async callbackQuery(id: string, parameters?: AnswerCallbackQuery): Promise<boolean | Error> {
    return this.telegram.api.post<AnswerCallbackQuery, boolean>('answerCallbackQuery', { callback_query_id: id, ...parameters })
  }

  async inlineQuery(id: string, results: InlineQueryResult[], parameters?: AnswerInlineQuery): Promise<boolean | Error> {
    return this.telegram.api.post<AnswerInlineQuery, boolean>('answerInlineQuery', { inline_query_id: id, results: results, ...parameters })
  }

  async shippingQuery(id: string, ok: boolean, parameters?: AnswerShippingQuery): Promise<boolean | Error> {
    return this.telegram.api.post<AnswerShippingQuery, boolean>('answerShippingQuery', { shipping_query_id: id, ok: ok, ...parameters })
  }

  async preCheckoutQuery(id: string, ok: boolean, parameters?: AnswerPreCheckoutQuery): Promise<boolean | Error> {
    return this.telegram.api.post<AnswerPreCheckoutQuery, boolean>('answerPreCheckoutQuery', { pre_checkout_query_id: id, ok: ok, ...parameters })
  }
}

export default Answer
