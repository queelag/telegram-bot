import { InlineKeyboardButton, LoginUrl } from '@queelag/telegram-types'
import { CallbackQueryUtils } from '../utils/callback.query.utils'

export class ButtonBuilder {
  callback<T>(text: string, data: T, type: string, chatID?: number): InlineKeyboardButton {
    return { text: text, callback_data: CallbackQueryUtils.encodeBody(data, type, chatID) }
  }

  game(text: string, game: string): InlineKeyboardButton {
    return { text: text, callback_game: game }
  }

  login(text: string, url: string, fields?: Partial<LoginUrl>): InlineKeyboardButton {
    return { text: text, login_url: { url: url, ...fields } }
  }

  pay(text: string): InlineKeyboardButton {
    return { text: text, pay: true }
  }

  query(text: string, query: string): InlineKeyboardButton {
    return { text: text, switch_inline_query: query }
  }

  queryCurrentChat(text: string, query: string): InlineKeyboardButton {
    return { text: text, switch_inline_query_current_chat: query }
  }

  text(text: string): InlineKeyboardButton {
    return { text: text }
  }

  url(text: string, url: string): InlineKeyboardButton {
    return { text: text, url: url }
  }
}
