import Add from '../childs/add'
import Answer from '../childs/answer'
import Create from '../childs/create'
import Delete from '../childs/delete'
import Download from '../childs/download'
import Edit from '../childs/edit'
import Export from '../childs/export'
import Forward from '../childs/forward'
import Get from '../childs/get'
import Kick from '../childs/kick'
import Leave from '../childs/leave'
import Pin from '../childs/pin'
import Polling from '../childs/polling'
import Promote from '../childs/promote'
import Restrict from '../childs/restrict'
import Send from '../childs/send'
import Set from '../childs/set'
import Stop from '../childs/stop'
import Unban from '../childs/unban'
import Unpin from '../childs/unpin'
import Upload from '../childs/upload'
import Webhook from '../childs/webhook'
import API from '../modules/api'
import Builder from '../modules/builder'
import Utils from '../modules/utils'

class Telegram {
  public api: API
  public hostname: string
  public token: string

  public get: Get
  public send: Send

  public builder: Builder
  public utils: Utils

  constructor(token: string, hostname: string = '') {
    this.api = new API('api.telegram.org', '/bot' + token + '/')
    this.hostname = hostname
    this.token = token

    this.get = new Get(this as any)
    this.send = new Send(this as any)

    this.builder = new Builder()
    this.utils = new Utils()
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
const _polling: Polling = new Polling(_telegram as any)
const _promote: Promote = new Promote(_telegram as any)
const _restrict: Restrict = new Restrict(_telegram as any)
const _send: Send = new Send(_telegram as any)
const _set: Set = new Set(_telegram as any)
const _stop: Stop = new Stop(_telegram as any)
const _unban: Unban = new Unban(_telegram as any)
const _unpin: Unpin = new Unpin(_telegram as any)
const _upload: Upload = new Upload(_telegram as any)
const _webhook: Webhook = new Webhook(_telegram as any)

const _builder: Builder = new Builder()
const _utils: Utils = new Utils()

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
  static polling: Polling = _polling
  static promote: Promote = _promote
  static restrict: Restrict = _restrict
  static send: Send = _send
  static set: Set = _set
  static stop: Stop = _stop
  static unban: Unban = _unban
  static unpin: Unpin = _unpin
  static upload: Upload = _upload
  static webhook: Webhook = _webhook

  static builder: Builder = _builder
  static utils: Utils = _utils
}

export default TelegramStatic
