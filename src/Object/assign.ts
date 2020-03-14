import { forOwn } from './forOwn'

/**
 * 分配来源对象的可枚举属性到目标对象上
 *
 * 来源对象的应用规则是从左往右，随后的下一个对象的属性会覆盖上一个对象的属性
 *
 * @param target 目标对象
 * @param sources 来源对象序列
 * @returns 返回扩展后的目标对象
 * @example
 * ```ts
 * assign(
 *  {},
 *  {x: 1},
 *  {y, 2},
 *  {x: 5, z: 10}
 * )
 * // => {x: 5, y: 2, z: 10}
 * ```
 */
export function assign<T extends object>(target: T, ...sources: object[]): T {
  // 使用Object["assign"]防止替换
  if (Object['assign']) {
    return Object['assign'](target, ...sources)
  }

  sources.forEach(source => {
    forOwn(source, (value, key) => {
      target[key] = value
    })
  })

  return target
}
