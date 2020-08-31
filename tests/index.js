const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Telegram = require('../dist/index').default
const fs = require('fs')

dotenv.config()

let e, t

e = express()
e.use(cors())
e.use(bodyParser.json())
e.listen(5000, () => console.log('Listening on port 5000'))

t = new Telegram(e, 'localhost', process.env.TOKEN)
t.webhook.delete().then(() => t.polling.start())

t.on(
  'start',
  (context) => {
    console.log(context)
    console.log(t.utils.parseStringParameters(context.text))
    console.log(t.utils.removeCommand(context.text))
    console.log(t.utils.findCommand(context))
    console.log(t.utils.findChatId(context))
    console.log(t.utils.findUsername(context))
    // t.send.message(context.chat.id, 'Hello there!')
    // t.send.photo(context.chat.id, fs.readFileSync(process.env.PWD + '/tests/photo.jpg'))
    // t.send.document(context.chat.id, fs.readFileSync(process.env.PWD + '/tests/document.pdf'))
    // t.send.html(context.chat.id, '<b>Detective</b>')
    // t.send.prompt(context.chat.id, '@' + process.env.USERNAME + ' reply to this message!')
    t.send.buttons(context.chat.id, 'Choose one of these', [
      { text: 'A', callback_data: '/a a:0' },
      { text: 'B', callback_data: '/b b:0' }
    ])
  },
  'TEXT'
)

t.on(
  'a',
  (context) => {
    console.log(context)
    console.log(t.utils.parseStringParameters(context.data))
    console.log(t.utils.removeCommand(context.data))
    console.log(t.utils.findCommand(context))
    console.log(t.utils.findChatId(context))
    console.log(t.utils.findUsername(context))
    t.send.message(context.message.chat.id, 'You chose ' + context.data)
  },
  'CALLBACK_QUERY'
)
t.on(
  'b',
  (context) => {
    console.log(context)
    console.log(t.utils.parseStringParameters(context.data))
    console.log(t.utils.removeCommand(context.data))
    console.log(t.utils.findCommand(context))
    console.log(t.utils.findChatId(context))
    console.log(t.utils.findUsername(context))
    t.send.message(context.message.chat.id, 'You chose ' + context.data)
  },
  'CALLBACK_QUERY'
)
