/**
 * 使用正则表达式转义字符串中的特殊字符
 *
 * @param str 要转义的字符串
 * @returns 返回转换后的字符串
 * @example
 * ```ts
 *  escapeRegExp("github.com") // => "github\\.com"
 * ```
 */
export function escapeRegExp(str: string): string {
  str = String(str)

  const reg = /[\\^$.*+?()[\]{}|]/g
  const hasReg = new RegExp(reg.source)

  return str && hasReg.test(str) ? str.replace(reg, '\\$&') : str
}
