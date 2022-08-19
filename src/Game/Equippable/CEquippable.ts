import { CharStats } from "../CharStats";
import IDamage from "../Damage/IDamege";
import CDecoratorSet from "../DecoratorsSet/CDecoratorSet";
import IDecoratorsSet from "../DecoratorsSet/IDecoratorSet";
import { EntityProps } from "../Entity/IEntity";
import { SkillContext, SkillEnhancers } from "../Skill";
import CStats from "../Stats/CStats";
import IStats from "../Stats/IStats";
import { DamagePoints } from "../WithDamage";
import IEquippable, { EquipmentType } from "./IEquippable";

type CEquippableProps = EntityProps & {
  type: EquipmentType;
  damagePoints?: DamagePoints;
} & Partial<CharStats>;

let idCounter = 0;

export default class CEquippable implements IEquippable {
  readonly id;
  readonly name;
  readonly type;
  readonly stats;
  skillEnhancers: SkillEnhancers;
  damagePoints: DamagePoints;
  defenseDecorators = CDecoratorSet.New<IDamage>();
  charStatDecorators = CDecoratorSet.New<IStats<CharStats>>();
  level;

  constructor({
    id,
    name,
    type,
    level,
    damagePoints = 0,
    ...charStats
  }: CEquippableProps) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.stats = new CStats<Partial<CharStats>>(charStats);
    this.level = level;
    this.damagePoints = damagePoints;
    this.skillEnhancers = {};
    const statDecorator = {
      process: this.statDecorator,
      id: `${id}_statDecorator`,
    };
    this.charStatDecorators.add(statDecorator);
  }

  applyStatBonus(stats: IStats<CharStats>): IStats<CharStats> {
    return this.charStatDecorators.apply(stats);
  }

  applyDefenseBonus(damage: IDamage): IDamage {
    return this.defenseDecorators.apply(damage);
  }

  getDamagePoints(): DamagePoints {
    return this.damagePoints;
  }

  getSkillEnhancers(id: string): IDecoratorsSet<SkillContext> {
    const all = this.skillEnhancers.all;
    const enhancers = this.skillEnhancers[id]?.getDecorators() || [];
    return CDecoratorSet.New(
      all ? enhancers.concat(all.getDecorators()) : enhancers
    );
  }

  statDecorator = (stats: IStats<CharStats>) => {
    for (const [key, value] of this.stats) {
      stats.changeValue(key, value);
    }
    return stats;
  };

  static New({
    name,
    type,
    id = `${name}_${type}_${idCounter++}`,
    level = 0,
    ...charStats
  }: { type: EquipmentType; name: string } & Partial<CharStats & EntityProps>) {
    return new this({
      ...charStats,
      name,
      type,
      id,
      level,
    });
  }
}
