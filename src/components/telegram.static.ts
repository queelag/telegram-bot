import API from '../modules/api'
import Webhook from '../childs/webhook'
import Send from '../childs/send'
import Polling from '../childs/polling'
import Get from '../childs/get'
import Edit from '../childs/edit'
import Delete from '../childs/delete'
import Add from '../childs/add'
import Answer from '../childs/answer'
import Create from '../childs/create'
import Export from '../childs/export'
import Forward from '../childs/forward'
import Kick from '../childs/kick'
import Leave from '../childs/leave'
import Pin from '../childs/pin'
import Promote from '../childs/promote'
import Restrict from '../childs/restrict'
import Set from '../childs/set'
import Stop from '../childs/stop'
import Unban from '../childs/unban'
import Unpin from '../childs/unpin'
import Upload from '../childs/upload'
import Utils from '../modules/utils'
import Telegram from './telegram'
import Download from '../childs/download'

const _telegram: Telegram = new Telegram(process.env.TOKEN || process.env.TELEGRAM_TOKEN, process.env.HOST || process.env.HOSTNAME || process.env.HOST_NAME)

const _add: Add = new Add(_telegram)
const _answer: Answer = new Answer(_telegram)
const _create: Create = new Create(_telegram)
const _delete: Delete = new Delete(_telegram)
const _download: Download = new Download(_telegram)
const _edit: Edit = new Edit(_telegram)
const _export: Export = new Export(_telegram)
const _forward: Forward = new Forward(_telegram)
const _get: Get = new Get(_telegram)
const _kick: Kick = new Kick(_telegram)
const _leave: Leave = new Leave(_telegram)
const _pin: Pin = new Pin(_telegram)
const _promote: Promote = new Promote(_telegram)
const _restrict: Restrict = new Restrict(_telegram)
const _send: Send = new Send(_telegram)
const _set: Set = new Set(_telegram)
const _stop: Stop = new Stop(_telegram)
const _unban: Unban = new Unban(_telegram)
const _unpin: Unpin = new Unpin(_telegram)
const _upload: Upload = new Upload(_telegram)
const _webhook: Webhook = new Webhook(_telegram)

const _polling: Polling = new Polling(_telegram)
const _utils: Utils = new Utils(_telegram)

class TelegramStatic {
  static api: API = _telegram.api
  static hostname: string = _telegram.hostname
  static token: string = _telegram.token

  static add: Add = _add
  static answer: Answer = _answer
  static create: Create = _create
  static delete: Delete = _delete
  static download: Download = _download
  static edit: Edit = _edit
  static export: Export = _export
  static forward: Forward = _forward
  static get: Get = _get
  static kick: Kick = _kick
  static leave: Leave = _leave
  static pin: Pin = _pin
  static promote: Promote = _promote
  static restrict: Restrict = _restrict
  static send: Send = _send
  static set: Set = _set
  static stop: Stop = _stop
  static unban: Unban = _unban
  static unpin: Unpin = _unpin
  static upload: Upload = _upload
  static webhook: Webhook = _webhook

  static polling: Polling = _polling
  static utils: Utils = _utils
}

export default TelegramStatic
