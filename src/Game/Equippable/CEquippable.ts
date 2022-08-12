import CCharStats, { CharStats } from "../CharStats";
import IDamage from "../Damage/IDamege";
import CDecoratorsSet from "../DecoratorsSet/CDecoratorsSet";
import { EntityProps } from "../Entity/IEntity";
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
  attackDecorators = CDecoratorsSet.New<IDamage>();
  defenseDecorators = CDecoratorsSet.New<IDamage>();
  statDecorators = CDecoratorsSet.New<IStats<CharStats>>();
  level;

  constructor({ id, name, type, level, ...charStats }: CEquippableProps) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.stats = CCharStats.New(charStats);
    this.level = level;
  }

  static New({
    name,
    type,
    id = `${name}_${type}_${idCounter++}`,
    level = 0,
    ...charStats
  }: { type: EquipmentType; name: string } & Partial<CharStats & EntityProps>) {
    return new CEquippable({
      ...charStats,
      name,
      type,
      id,
      level,
    });
  }
}
