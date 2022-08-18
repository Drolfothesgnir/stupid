import IStats from "./IStats";

export default class BaseStatDecorator<T extends Record<string, number>, K extends IStats<T> = IStats<T>> implements IStats<T> {
  decorated: K;

  constructor (decorated: K) {
    this.decorated = decorated
  }

  getValue(key: keyof T) {
    return this.decorated.getValue(key)
  }

  setValue(key: keyof T, value: number) {
    return this.decorated.setValue(key, value)
  }

  changeValue(key: keyof T, value: number) {
    return this.decorated.changeValue(key, value)
  }

  changeValueByFactor(key: keyof T, factor: number){
    return this.decorated.changeValueByFactor(key, factor)
  }

  getValues() {
    return this.decorated.getValues()
  }

  setValues(values: T) {
    return this.decorated.setValues(values)
  }

  [Symbol.iterator]() {
    return this.decorated[Symbol.iterator]()
  }
}