import IDecoratorsSet, { DecoratorFn } from "./IDecoratorsSet";

let IdCounter = 0

export default class CDecoratorsSet<T> implements IDecoratorsSet<T> {
  values: DecoratorFn<T>[] = []

  add(...fnArr: DecoratorFn<T>[]) {
    this.values.push(...fnArr)
    this.sort()
  }

  set(arr: DecoratorFn<T>[]) {
    this.values = arr
    this.sort()
  }

  remove(fn: DecoratorFn<T>) {
    this.set(this.values.filter(dec => dec.id !== fn.id))
  }

  apply(value: T) {
    return this.values.reduce((val, fn) => fn(val), value)
  }

  sort() {
    this.values.sort((a, b) => a.order - b.order)
  }

  getDecorator(id: string | number): DecoratorFn<T> | undefined {
    return this.values.find(fn => fn.id === id)
  }

  getDecorators(): DecoratorFn<T>[] {
    return [...this.values]
  }

  static New<T>(arr?: DecoratorFn<T>[]) {
    const result = new CDecoratorsSet<T>();
    if (arr) {
      result.set(arr)
    }
    return result
  }

  static createDecoratorFn<T>(fn: (arg: T) => T, order = 0, id = IdCounter++) {
    (fn as DecoratorFn<T>).id = id;
    (fn as DecoratorFn<T>).order = order;
    return fn as DecoratorFn<T>;
  }
}