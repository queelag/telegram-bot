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
import Download from '../childs/download'

class Telegram {
  public api: API
  public hostname: string
  public token: string

  constructor(token: string, hostname: string = '') {
    this.api = new API('api.telegram.org', '/bot' + token + '/')
    this.hostname = hostname
    this.token = token
  }
}

const _telegram: Telegram = new Telegram(process.env.TOKEN || process.env.TELEGRAM_TOKEN, process.env.HOST || process.env.HOSTNAME || process.env.HOST_NAME)

const _add: Add = new Add(_telegram as any)
const _answer: Answer = new Answer(_telegram as any)
const _create: Create = new Create(_telegram as any)
const _delete: Delete = new Delete(_telegram as any)
const _download: Download = new Download(_telegram as any)
const _edit: Edit = new Edit(_telegram as any)
const _export: Export = new Export(_telegram as any)
const _forward: Forward = new Forward(_telegram as any)
const _get: Get = new Get(_telegram as any)
const _kick: Kick = new Kick(_telegram as any)
const _leave: Leave = new Leave(_telegram as any)
const _pin: Pin = new Pin(_telegram as any)
const _promote: Promote = new Promote(_telegram as any)
const _restrict: Restrict = new Restrict(_telegram as any)
const _send: Send = new Send(_telegram as any)
const _set: Set = new Set(_telegram as any)
const _stop: Stop = new Stop(_telegram as any)
const _unban: Unban = new Unban(_telegram as any)
const _unpin: Unpin = new Unpin(_telegram as any)
const _upload: Upload = new Upload(_telegram as any)
const _webhook: Webhook = new Webhook(_telegram as any)

const _polling: Polling = new Polling(_telegram as any)
const _utils: Utils = new Utils(_telegram as any)

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
