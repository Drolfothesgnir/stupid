import IStats from "./IStats";

export default class CStats<T extends Record<string, number>>
  implements IStats<T>
{
  protected values: T;

  constructor(stats: T) {
    this.values = stats;
  }

  getValue(key: keyof T): number {
    return typeof this.values[key] === "number" ? this.values[key] : 0;
  }

  getValues() {
    return { ...this.values };
  }

  setValue(key: keyof T, value: number) {
    (this.values[key] as number) = value;
  }

  setValues(stats: T) {
    this.values = stats;
  }

  changeValue(key: keyof T, value: number) {
    if (typeof this.values[key] === "number") {
      (this.values[key] as number) += value;
    } else {
      this.setValue(key, value);
    }
  }

  changeValueByFactor(key: keyof T, factor: number) {
    if (typeof this.values[key] === "number") {
      (this.values[key] as number) *= factor;
    }
  }

  *[Symbol.iterator](): IterableIterator<[keyof T, number]> {
    for (const key in this.values) {
      if (Object.prototype.hasOwnProperty.call(this.values, key)) {
        const element = this.values[key];
        yield [key, element];
      }
    }
  }
}
