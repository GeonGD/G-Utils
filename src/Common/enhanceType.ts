/**
 * 任意对象类型。
 */
export type AnyObject = Record<keyof any, any>

/**
 * 任意函数类型。
 */
export type AnyFunction = (...args: any[]) => any
