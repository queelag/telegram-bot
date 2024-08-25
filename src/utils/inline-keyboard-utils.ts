import type { InlineKeyboardButton, LoginUrl, SwitchInlineQueryChosenChat, WebAppInfo } from '@aracna/telegram-bot-types'
import { encodeCallbackQueryBody } from './callback-query-utils'

export function getInlineKeyboardCallbackButton<T>(text: string, data: T, type: string, chatID?: bigint): InlineKeyboardButton {
  return { text: text, callback_data: encodeCallbackQueryBody(data, type, chatID) }
}

export function getInlineKeyboardGameButton(text: string, game: string): InlineKeyboardButton {
  return { text: text, callback_game: game }
}

export function getInlineKeyboardLoginButton(text: string, url: string, fields?: Partial<LoginUrl>): InlineKeyboardButton {
  return { text: text, login_url: { url: url, ...fields } }
}

export function getInlineKeyboardPayButton(text: string): InlineKeyboardButton {
  return { text: text, pay: true }
}

export function getInlineKeyboardQueryButton(text: string, query: string): InlineKeyboardButton {
  return { text: text, switch_inline_query: query }
}

export function getInlineKeyboardQueryChosenChatButton(text: string, query: SwitchInlineQueryChosenChat): InlineKeyboardButton {
  return { text: text, switch_inline_query_chosen_chat: query }
}

export function getInlineKeyboardQueryCurrentChatButton(text: string, query: string): InlineKeyboardButton {
  return { text: text, switch_inline_query_current_chat: query }
}

export function getInlineKeyboardTextButton(text: string): InlineKeyboardButton {
  return { text: text }
}

export function getInlineKeyboardUrlButton(text: string, url: string): InlineKeyboardButton {
  return { text: text, url: url }
}

export function getInlineKeyboardWebAppButton(text: string, app: WebAppInfo): InlineKeyboardButton {
  return { text: text, web_app: app }
}
