import { CharStats } from "../CharStats";
import IDamege from "../Damage/IDamege";
import { IDamageable, IRestoration, VitalityProps } from "../Damageable";
import CDecoratorSet from "../DecoratorsSet/CDecoratorSet";
import IDecoratorsSet from "../DecoratorsSet/IDecoratorSet";
import CEquipment, { IEquipment, ItemSlotsConfig } from "../Equipment";
import IEquippable, { EquipmentType } from "../Equippable/IEquippable";
import { SkillContext, SkillEnhancers } from "../Skill";
import CStats from "../Stats/CStats";
import IStats from "../Stats/IStats";

export interface Character extends IDamageable {
  getStats(): CharStats;
  getOriginalStats(): CharStats;
  getSkillEnhancers(id: string): IDecoratorsSet<SkillContext>;
  getVitalityStats(): VitalityProps;
  getEquipment(): IEquipment;
  equip(item: IEquippable, index?: number): void;
  unequip(item: EquipmentType, index?: number): IEquippable | null;
}

export type CharacterProps = {
  name: string;
  id: string;
  stats: CharStats;
  level: number;
  equipment: ItemSlotsConfig;
};

export default class CCharacter implements Character {
  readonly name: string;
  readonly id: string;
  level: number;
  originalStats: IStats<CharStats>;
  stats: IStats<CharStats>;
  equipment: IEquipment;
  originalVitalityProps: VitalityProps;
  vitalityProps: IStats<VitalityProps>;
  defenseDecorators: IDecoratorsSet<IDamege> = CDecoratorSet.New();
  skillEnhancers: SkillEnhancers;

  constructor({ name, id, stats, level, equipment }: CharacterProps) {
    this.name = name;
    this.id = id;
    this.level = level;
    this.originalStats = new CStats(stats);
    this.stats = new CStats(stats);
    this.equipment = new CEquipment(equipment);
    this.skillEnhancers = {};
    const vitalityProps = this.calculateVitalityProps();
    this.originalVitalityProps = vitalityProps;
    this.vitalityProps = new CStats(vitalityProps);
  }

  calculateVitalityProps() {
    const stats = this.getStats();

    const maxHealth = stats.health + stats.strength * 2;
    const maxMagic = stats.magic + stats.intelligence * 2;

    return {
      health: maxHealth,
      magic: maxMagic,
    };
  }

  getStats(): CharStats {
    return this.stats.getValues();
  }

  getOriginalStats(): CharStats {
    return this.originalStats.getValues();
  }

  getSkillEnhancers(id: string): IDecoratorsSet<SkillContext> {
    const all = this.skillEnhancers.all;
    const enhancers = this.skillEnhancers[id]?.getDecorators() || [];
    const itemEnhancers = this.equipment.getSkillEnhancers(id).getDecorators();
    return CDecoratorSet.New(
      all
        ? enhancers.concat(all.getDecorators(), itemEnhancers)
        : enhancers.concat(itemEnhancers)
    );
  }

  getVitalityStats(): VitalityProps {
    return this.vitalityProps.getValues();
  }

  getEquipment(): IEquipment {
    return this.equipment;
  }

  isDead(): boolean {
    return this.vitalityProps.getValue("health") <= 0;
  }

  attack(damage: IDamege): void {
    const dmg = this.defenseDecorators.apply(damage);
    this.vitalityProps.changeValue("health", -dmg);
  }

  restore(restoration: IRestoration): void {
    for (const [key, value] of restoration) {
      this.vitalityProps.changeValue(key, value);
    }
  }

  calculateItemBonus() {
    this.stats = this.equipment.applyStatBonus(this.originalStats);
  }

  equip(item: IEquippable, index?: number | undefined): void {
    this.equipment.equip(item, index);
    this.calculateItemBonus();
    this.originalVitalityProps = this.calculateVitalityProps();
  }

  unequip(item: EquipmentType, index?: number | undefined): IEquippable | null {
    const result = this.equipment.unequip(item, index);
    this.calculateItemBonus();
    this.originalVitalityProps = this.calculateVitalityProps();
    return result;
  }
}
