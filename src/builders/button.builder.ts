import { InlineKeyboardButton, LoginUrl } from '@queelag/telegram-types'

class ButtonBuilder {
  text(text: string): InlineKeyboardButton {
    return { text: text }
  }

  url(text: string, url: string): InlineKeyboardButton {
    return { text: text, url: url }
  }

  login(text: string, url: string, fields?: Partial<LoginUrl>): InlineKeyboardButton {
    return { text: text, login_url: { url: url, ...fields } }
  }

  callback(text: string, data: string): InlineKeyboardButton {
    return { text: text, callback_data: data }
  }

  query(text: string, query: string): InlineKeyboardButton {
    return { text: text, switch_inline_query: query }
  }

  queryCurrentChat(text: string, query: string): InlineKeyboardButton {
    return { text: text, switch_inline_query_current_chat: query }
  }

  game(text: string, game: string): InlineKeyboardButton {
    return { text: text, callback_game: game }
  }

  pay(text: string): InlineKeyboardButton {
    return { text: text, pay: true }
  }
}

export default ButtonBuilder
