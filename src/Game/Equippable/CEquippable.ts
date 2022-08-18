import { CharStats } from "../CharStats";
import IDamage from "../Damage/IDamege";
import CDecoratorSet from "../DecoratorsSet/CDecoratorSet";
import { EntityProps } from "../Entity/IEntity";
import CStats from "../Stats/CStats";
import IStats from "../Stats/IStats";
import IEquippable, { EquipmentType } from "./IEquippable";

type CEquippableProps = EntityProps & {
  type: EquipmentType;
} & Partial<CharStats>;

let idCounter = 0;

export default class CEquippable implements IEquippable {
  readonly id;
  readonly name;
  readonly type;
  readonly stats;
  attackDecorators = CDecoratorSet.New<IDamage>();
  defenseDecorators = CDecoratorSet.New<IDamage>();
  charStatDecorators = CDecoratorSet.New<IStats<CharStats>>();
  level;

  constructor({ id, name, type, level, ...charStats }: CEquippableProps) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.stats = new CStats<Partial<CharStats>>(charStats)
    this.level = level;
    const statDecorator = {process: this.statDecorator, id: `${id}_statDecorator`}
    this.charStatDecorators.add(statDecorator)
  }

  applyStatBonus(stats: IStats<CharStats>): IStats<CharStats> {
    return this.charStatDecorators.apply(stats)
  }

  applyAttackBonus(damage: IDamage): IDamage {
    return this.attackDecorators.apply(damage)
  }

  applyDefenseBonus(damage: IDamage): IDamage {
    return this.defenseDecorators.apply(damage)
  }

  statDecorator = (stats: IStats<CharStats>) => {
    for (const [key, value] of this.stats) {
      stats.changeValue(key, value)
    }
    return stats
  }

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
