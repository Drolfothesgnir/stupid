import IStats from "./IStats";

export default class CStats<T extends {[key:string]: number}> implements IStats<T> {
  protected values: T;

  constructor (stats: T) {
    this.values = stats
  }

  getValue(key: keyof T): number {
    return this.values[key]
  }

  getValues(): T {
    return {...this.values}
  }

  setValue(key: keyof T, value: number) {
    (this.values as {[Prop in keyof T]: number})[key] = value
  }

  setValues(stats: T) {
    this.values = stats
  }

  changeValue(key: keyof T,  value: number) {
    (this.values as {[Prop in keyof T]: number})[key] += value
  }

  changeValueByFactor(key: keyof T, factor: number) {
    (this.values as {[Prop in keyof T]: number})[key] *= factor
  }
}