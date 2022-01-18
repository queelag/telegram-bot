import { InlineKeyboardButton, LoginUrl } from '@queelag/telegram-types'

export class ButtonBuilder {
  text(text: string): InlineKeyboardButton {
    return { text: text }
  }

  url(text: string, url: string): InlineKeyboardButton {
    return { text: text, url: url }
  }

  login(text: string, url: string, fields?: Partial<LoginUrl>): InlineKeyboardButton {
    return { text: text, login_url: { url: url, ...fields } }
  }

  callback<T extends object>(text: string, command: string, parameters?: T): InlineKeyboardButton {
    return { text: text, callback_data: this.toCallbackData(command, parameters) }
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

  private toCallbackData<T extends object>(command: string, parameters?: T): string {
    return '/' + command + ' ' + this.toStringParameters(parameters)
  }

  private toStringParameters<T extends object>(parameters: T = {} as T): string {
    return Object.entries(parameters)
      .reduce((r: string[], [k, v]: [string, any]) => [...r, `${k}:${v}`], [])
      .join(' ')
  }
}
