import { CharStats } from "../CharStats";
import IDamage from "../Damage/IDamege";
import IEquippable, { EquipmentType } from "../Equippable/IEquippable";
import IStats from "../Stats/IStats";
import IWithStatBonuses from "../WithStatBonuses";

export interface IEquipment extends IWithStatBonuses {
  equip(item: IEquippable, index?: number): void;

  unequip(item: EquipmentType, index?: number): IEquippable | null;
}

type ItemSlots = {
  [key in EquipmentType]?: (IEquippable | null)[];
}

type ItemSlotsConfig = {
  [key in EquipmentType]?: number;
}

export default class CEquipment implements IEquipment {
  items: ItemSlots;

  constructor (slots: ItemSlotsConfig) {
    this.items = {}
    Object.entries(slots).forEach(([key, size]) => {
      this.items[key as EquipmentType] = Array.from({ length: size!}).map(() => null)
    })
  }

  equip(item: IEquippable, index = 0) {
    if (this.items[item.type]!?.length <= index) return

    this.items[item.type]![index] = item
  }

  unequip(item: EquipmentType, index = 0) {
    if (!this.items[item]?.[index]) return null
    const result = this.items[item]![index];
    this.items[item]![index] = null
    return result
  }

  applyStatBonus(stats: IStats<CharStats>) {
    return Object.values(this.items).reduce((result, itemsArr) => {
      return itemsArr.filter(item => !!item).reduce((bonus, item) => item!.applyStatBonus(bonus), result)
    }, stats)
  }
}

