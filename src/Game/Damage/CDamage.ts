import IDamage, { DamageProps } from "./IDamege";
import CStats from "../Stats/CStats";


export default class CDamage extends CStats<Partial<DamageProps>> implements IDamage {
  valueOf() {
    return Object.values(this.values).reduce((prev, next) => next + prev, 0);
  }

  finalize() {
    return this
  }
}

