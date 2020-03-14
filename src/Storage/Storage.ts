import { isFunction } from '../Common/is'
import { StorageAdapter } from './StorageAdapter'

export class Storage<
  T extends Record<string, any> = Record<string, any>,
  K extends Extract<keyof T, string> = Extract<keyof T, string>
> {
  constructor(private adapter: StorageAdapter) { }

  set(key: K, value: T[K]): Promise<void> {
    return this.adapter.set(key, value)
  }

  setSync(key: K, value: T[K]): void {
    return this.adapter.setSync(key, value)
  }

  get<DV extends T[K] |(() => (T[K] | Promise<T[K]>))>(key: K, defaultValue: DV = null as any): Promise<T[K]> {
    return new Promise((resolve, reject) => {
      this.adapter.get(key)
        .then((value) => {
          if (value != null) {
            return value
          }
          return isFunction(defaultValue) ? defaultValue() : defaultValue
        })
        .then(resolve)
        .catch(reject)
    })
  }

  getSync<DV extends T[K] |(() => T[K])>(key: K, defaultValue: DV = null as any): T[K] {
    let value = this.adapter.getSync(key)
    if (value == null) {
      value = isFunction(defaultValue) ? defaultValue() : defaultValue
    }
    return value
  }

  getRemember<DV extends T[K] |(() => (T[K] | Promise<T[K]>))>(key: K, defaultValue: DV = null as any): Promise<T[K]> {
    return this.get(key, defaultValue).then(value => {
      if (value != null) {
        return this.set(key, value).then(() => value)
      }
      return value
    })
  }

  getRememberSync<DV extends T[K] |(() => T[K])>(key: K, defaultValue: DV = null as any): T[K] {
    const value = this.getSync(key, defaultValue)
    if (value != null) {
      this.setSync(key, value)
    }
    return value
  }

  remove(key: K) {
    return this.adapter.remove(key)
  }

  removeSync(key: K) {
    return this.adapter.removeSync(key)
  }

  clear() {
    return this.adapter.clear()
  }

  clearSync() {
    return this.adapter.clearSync()
  }
}
