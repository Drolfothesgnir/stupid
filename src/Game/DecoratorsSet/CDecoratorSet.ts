import IDecoratorsSet, { Decorator } from "./IDecoratorSet";

export default class CDecoratorSet<T> implements IDecoratorsSet<T> {
  values: Decorator<T>[] = []

  add(...decArr: Decorator<T>[]) {
    this.values.push(...decArr)
  }

  set(arr: Decorator<T>[]) {
    this.values = arr
  }

  remove(decorator: Decorator<T>) {
    this.set(this.values.filter(dec => dec.id !== decorator.id))
  }

  apply(value: T) {
    return this.values.reduce((val, dec) => dec.process(val), value)
  }

  getDecorator(id: string | number): Decorator<T> | undefined {
    return this.values.find(dec => dec.id === id)
  }

  getDecorators(): Decorator<T>[] {
    return [...this.values]
  }

  static New<T>(arr?: Decorator<T>[]) {
    const result = new CDecoratorSet<T>();
    if (arr) {
      result.set(arr)
    }
    return result
  }
}