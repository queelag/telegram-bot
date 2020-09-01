import Telegram from '..'

const ENV = new Telegram(process.env.TOKEN || process.env.TELEGRAM_TOKEN, process.env.HOST || process.env.HOSTNAME || process.env.HOST_NAME)

export default ENV
