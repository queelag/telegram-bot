import type { UpdateType } from './enums'
import type { Context } from './interfaces'

export type HandlerMiddleware<T extends UpdateType> = (context: Context[T]) => any

export type InputFile = File | string
