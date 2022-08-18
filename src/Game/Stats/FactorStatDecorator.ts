import BaseStatDecorator from "./BaseStatDecorator";
import IStats, { StatDecorator, StatDecoratorDescriptor } from "./IStats";

export default class FactorStatDecorator<
  T extends Record<string, number>
> extends BaseStatDecorator<T> {
  stats: IStats<T>;
  constructor(decorated: IStats<T>, stats: IStats<T>) {
    super(decorated);
    this.stats = stats;
    this.applyFactor();
  }

  applyFactor() {
    for (const [key, factor] of this.stats) {
      this.decorated.changeValueByFactor(key, factor)
    }
  }

  changeValue(key: keyof T, value: number): void {
    const factor = this.stats.getValue(key);

    const val = typeof factor === "number" ? factor * value : value;

    return this.decorated.changeValue(key, val);
  }

  setValue(key: keyof T, value: number): void {
    const factor = this.stats.getValue(key);

    const val = typeof factor === "number" ? factor * value : value;

    return this.decorated.setValue(key, val);
  }

  static getDecoratorFn<T extends Record<string, number>>(id: string | number, stats: IStats<T>) {
    return new StatProcessor(id, stats)
  }
}

export class StatProcessor<T extends Record<string, number>> implements StatDecorator<T> {
  id: string | number;
  stats: IStats<T>
  constructor (id: string | number, stats: IStats<T>) {
    this.id = id;
    this.stats = stats;
  }

  process(arg: IStats<T>): IStats<T> {
    return new FactorStatDecorator<T>(arg, this.stats);
  }

  getDescription(): StatDecoratorDescriptor<T> {
    return {
      inPercentages: this.stats.getValues()
    }
  }
}