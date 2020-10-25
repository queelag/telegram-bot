class NumberUtils {
  static parse(v: any): number {
    return isNaN(parseFloat(v)) ? 0 : parseFloat(v)
  }
}

export default NumberUtils
