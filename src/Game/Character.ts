import { Damage } from "./Damage.js";
import { Entity } from "./Entity.js";


export class Character extends Entity {

  createAttackDamage() {
    return this.attackDecorators.apply(Damage.New())
  }

  applyDamage(damage: Damage) {
    const finalDamage = this.defenseDecorators.apply(damage);
    this.changeMainProp('health', -finalDamage);
  }
}
