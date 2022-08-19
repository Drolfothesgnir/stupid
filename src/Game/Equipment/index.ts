import { CharStats } from "../CharStats";
import CDecoratorSet from "../DecoratorsSet/CDecoratorSet";
import IDecoratorsSet, { Decorator } from "../DecoratorsSet/IDecoratorSet";
import IEquippable, { EquipmentType } from "../Equippable/IEquippable";
import { SkillContext } from "../Skill";
import IStats from "../Stats/IStats";
import { DamagePoints } from "../WithDamage";
import IWithStatBonuses from "../WithStatBonuses";

export interface IEquipment extends IWithStatBonuses {
  equip(item: IEquippable, index?: number): void;

  unequip(item: EquipmentType, index?: number): IEquippable | null;

  getDamagePointsBonus(): DamagePoints;

  getSkillEnhancers(id: string): IDecoratorsSet<SkillContext>;

  [Symbol.iterator](): IterableIterator<[EquipmentType, IEquippable[]]>;
}

type ItemSlots = {
  [key in EquipmentType]?: (IEquippable | null)[];
};

export type ItemSlotsConfig = {
  [key in EquipmentType]?: number;
};

export default class CEquipment implements IEquipment {
  items: ItemSlots;

  constructor(slots: ItemSlotsConfig) {
    this.items = {};
    Object.entries(slots).forEach(([key, size]) => {
      this.items[key as EquipmentType] = Array.from({ length: size! }).map(
        () => null
      );
    });
  }

  equip(item: IEquippable, index = 0) {
    if ((this.items[item.type]!?.length || 0) <= index) return;

    this.items[item.type]![index] = item;
  }

  unequip(item: EquipmentType, index = 0) {
    if (!this.items[item]?.[index]) return null;
    const result = this.items[item]![index];
    this.items[item]![index] = null;
    return result;
  }

  applyStatBonus(stats: IStats<CharStats>) {
    let result = stats;
    for (const [, items] of this) {
      result = items.reduce(
        (bonus, item) => item.applyStatBonus(bonus),
        result
      );
    }
    return result;
  }

  getDamagePointsBonus(): number {
    let result = 0;
    for (const [_, items] of this) {
      result = items.reduce(
        (sum, item) => item.getDamagePoints() + sum,
        result
      );
    }
    return result;
  }

  *[Symbol.iterator](): IterableIterator<[EquipmentType, IEquippable[]]> {
    for (const key in this.items) {
      if (Object.prototype.hasOwnProperty.call(this.items, key)) {
        yield [
          key as EquipmentType,
          this.items[key as EquipmentType]!.filter(
            (item) => !!item
          ) as IEquippable[],
        ];
      }
    }
  }

  getSkillEnhancers(id: string): IDecoratorsSet<SkillContext> {
    let arr: Decorator<SkillContext>[] = [];
    for (const [_, items] of this) {
      arr = items
        .map((item) => item.getSkillEnhancers(id).getDecorators())
        .reduce((prev, item) => prev.concat(item), arr);
    }
    return CDecoratorSet.New(arr);
  }
}
