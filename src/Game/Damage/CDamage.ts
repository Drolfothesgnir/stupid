import IDamage, { DamageProps } from "./IDamege";
import CStats from "../Stats/CStats";


export default class CDamage extends CStats<DamageProps> implements IDamage {

  valueOf() {
    return Object.values(this.values).reduce((prev, next) => next + prev, 0);
  }
}

export type DamageDecorator = (damage: IDamage) => IDamage;
