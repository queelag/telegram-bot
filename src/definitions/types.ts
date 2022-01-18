import { UpdateType } from './enums'
import { Context } from './interfaces'

export type HandlerMiddleware<T extends UpdateType> = (context: Context[T]) => any

export type InputFile = File | string
