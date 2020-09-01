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
import Core from './core'
import Download from '../childs/download'

const _core: Core = new Core(process.env.TOKEN || process.env.TELEGRAM_TOKEN, process.env.HOST || process.env.HOSTNAME || process.env.HOST_NAME)
console.log(_core)

const _add: Add = new Add(_core)
const _answer: Answer = new Answer(_core)
const _create: Create = new Create(_core)
const _delete: Delete = new Delete(_core)
const _download: Download = new Download(_core)
const _edit: Edit = new Edit(_core)
const _export: Export = new Export(_core)
const _forward: Forward = new Forward(_core)
const _get: Get = new Get(_core)
const _kick: Kick = new Kick(_core)
const _leave: Leave = new Leave(_core)
const _pin: Pin = new Pin(_core)
const _promote: Promote = new Promote(_core)
const _restrict: Restrict = new Restrict(_core)
const _send: Send = new Send(_core)
const _set: Set = new Set(_core)
const _stop: Stop = new Stop(_core)
const _unban: Unban = new Unban(_core)
const _unpin: Unpin = new Unpin(_core)
const _upload: Upload = new Upload(_core)
const _webhook: Webhook = new Webhook(_core)

const _polling: Polling = new Polling(_core)
const _utils: Utils = new Utils(_core)

class CoreStatic {
  static api: API = _core.api
  static hostname: string = _core.hostname
  static token: string = _core.token

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

export default CoreStatic
