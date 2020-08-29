import Telegram from '..'

class Component {
  protected telegram: Telegram

  constructor(telegram: Telegram) {
    this.telegram = telegram
  }
}

export default Component
