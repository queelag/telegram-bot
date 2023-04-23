import { InlineKeyboardButton } from '@aracna/telegram-bot-types'

export class InlineKeyboardUtils {
  static getButtonsType(buttons: InlineKeyboardButton[]): string {
    switch (Object.keys(buttons[0]).filter((v: string) => v !== 'text')[0]) {
      case 'url':
        return 'url'
      case 'login_url':
        return 'login'
      case 'callback_data':
        return 'callback'
      case 'switch_inline_query':
        return 'query'
      case 'switch_inline_query_current_chat':
        return 'queryCurrentChat'
      case 'callback_game':
        return 'game'
      case 'pay':
        return 'pay'
      default:
        return ''
    }
  }
}
