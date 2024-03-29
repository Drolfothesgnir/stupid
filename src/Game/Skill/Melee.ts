import { Skill } from ".";
import { Character } from "../Character";
import { CharStats } from "../CharStats";
import CDamage from "../Damage/CDamage";
import { VitalityProps } from "../Damageable";

export default class Melee implements Skill {
  static get id() {
    return "Skill_Melee"
  }

  static get skillName() {
    return 'Melee strike'
  }

  get id() {
    return Melee.id
  }

  get name() {
    return Melee.skillName
  }

  use(user: Character, target: Character) {
    const stats = user.getStats();
    const enhancers = user.getSkillEnhancers(this.id);
    const equipment = user.getEquipment();
    const damage = new CDamage({physical: equipment.getDamagePointsBonus() + stats.strength * 1.5});
    const ctx = enhancers.apply({
      user,
      target,
      damage
    });
    target.attack(ctx.damage!.finalize());
    if (ctx.additionalDamage) {
      ctx.additionalDamage.forEach(target.attack);
    }
  }

  getRequirements() {
    return {} 
  }
}