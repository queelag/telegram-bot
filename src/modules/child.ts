import type { Telegram } from './telegram'

export class Child {
  protected telegram: Telegram

  constructor(telegram: Telegram) {
    this.telegram = telegram
  }
}
