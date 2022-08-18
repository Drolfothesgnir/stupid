import { IVitalityStats } from ".";
import BaseStatDecorator from "../Stats/BaseStatDecorator"

export default class BaseVitalityDecorator<T extends Record<string, number>> extends BaseStatDecorator<T, IVitalityStats<T>> implements IVitalityStats<T> {
  finalize() {
    return this.decorated
  }

  valueOf() {
    return this.decorated.valueOf()
  }
}