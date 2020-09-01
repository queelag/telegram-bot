import Telegram from '../components/telegram'

class Child {
  protected telegram: Telegram

  constructor(telegram: Telegram) {
    this.telegram = telegram
  }
}

export default Child
