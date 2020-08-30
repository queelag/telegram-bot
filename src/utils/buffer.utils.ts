import FileType, { FileTypeResult } from 'file-type'
import tcp from '../modules/tcp'

class BufferUtils {
  static async toFileExtension(buffer: Buffer): Promise<string> {
    let type: FileTypeResult | Error

    type = await tcp<FileTypeResult>(() => FileType.fromBuffer(buffer))
    if (type instanceof Error) return ''

    return '.' + type.ext
  }
}

export default BufferUtils
