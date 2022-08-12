export type DecoratorFn<T> = {
  (arg: T): T,
  id: number | string,
  order: number
}

export default interface IDecoratorsSet<T> {
  add(...fnArr: DecoratorFn<T>[]): void

  set(arr: DecoratorFn<T>[]): void

  remove(fn: DecoratorFn<T>): void

  apply(value: T): T

  getDecorator(id: number | string): DecoratorFn<T> | undefined
  
  getDecorators(): DecoratorFn<T>[]
}