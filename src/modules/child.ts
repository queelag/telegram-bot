import Core from '../components/core'

class Child {
  protected telegram: Core

  constructor(telegram: Core) {
    this.telegram = telegram
  }
}

export default Child
