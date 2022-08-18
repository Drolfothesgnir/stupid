export interface Decorator<T> {
  id: string | number;
  process(arg: T): T;
}

export default interface IDecoratorsSet<T> {
  add(...fnArr: Decorator<T>[]): void

  set(arr: Decorator<T>[]): void

  remove(fn: Decorator<T>): void

  apply(value: T): T

  getDecorator(id: number | string): Decorator<T> | undefined
  
  getDecorators(): Decorator<T>[]
}