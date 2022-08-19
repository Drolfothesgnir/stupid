import { Skill } from ".";
import { Character } from "../Character";
import { CharStats } from "../CharStats";
import CDamage from "../Damage/CDamage";
import { VitalityProps } from "../Damageable";

export default class Fireball implements Skill {
  static get id() {
    return "Skill_Fireball"
  }

  static get skillName() {
    return 'Fireball'
  }

  get id() {
    return Fireball.id
  }

  get name() {
    return Fireball.skillName
  }

  use(user: Character, target: Character) {
    const reqs = this.getRequirements();
    const vitalityProps = user.getVitalityStats();
    if (vitalityProps.magic < reqs.user.magic) return;

    const stats = user.getStats();
    const enhancers = user.getSkillEnhancers(this.id);
    const damage = new CDamage({elemental_fire: 20 + stats.intelligence * 2 });
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
    return {
      user: {
        magic: 20
      }
    }
  }
}