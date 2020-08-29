const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Telegram = require('../dist/index').default

dotenv.config()

let e, t

e = express()
e.use(cors())
e.use(bodyParser.json())
e.listen(5000, () => console.log('Listening on port 5000'))

t = new Telegram(e, process.env.TOKEN, 'localhost')
t.poll.start()

t.on(
  'start',
  (context) => {
    console.log(context)
    t.send.message(context.chat.id, 'Hello there!')
  },
  'TEXT'
)
