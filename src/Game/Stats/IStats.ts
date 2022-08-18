import { Decorator } from "../DecoratorsSet/IDecoratorSet";

export default interface IStats<T extends Record<string, number>> {
  getValues(): T;

  setValues(values: T): void;

  getValue(key: keyof T): number;

  setValue(key: keyof T, value: number): void;

  changeValue(key: keyof T, value: number): void;

  changeValueByFactor(key: keyof T, factor: number): void;

  [Symbol.iterator](): IterableIterator<[keyof T, number]>;
}

export type StatDecoratorDescriptor<T extends Record<string, number>> = {
  inUnits?: T,
  inPercentages?: T
}

export interface StatDecorator<T extends Record<string, number>> extends Decorator<IStats<T>> {
  getDescription(): StatDecoratorDescriptor<T>
}