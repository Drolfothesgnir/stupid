export type Decorator<T> = (arg: T) => T;

export class DecoratorsArray<T> {
  decorators: Decorator<T>[] = [];

  add(decorator: Decorator<T>) {
    this.decorators.push(decorator);
  }

  set(arr: Decorator<T>[]) {
    this.decorators = arr;
  }

  remove(decorator: Decorator<T>) {
    const result = this.decorators.filter((item) => item !== decorator);

    this.decorators = result;
  }

  apply(value: T) {
    return this.decorators.reduce((val, decorator) => decorator(val), value);
  }
}