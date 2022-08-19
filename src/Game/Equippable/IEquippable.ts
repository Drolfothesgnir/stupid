import IDecoratorsSet from "../DecoratorsSet/IDecoratorSet";
import IEntity from "../Entity/IEntity";
import { SkillContext } from "../Skill";
import IWithDamagePoints from "../WithDamage";
import IWithStatBonuses from "../WithStatBonuses";

export enum EquipmentType {
  WEAPON = 'WEAPON',
  ARMOR = 'ARMOR'
}

export default interface IEquippable extends IEntity, IWithStatBonuses, IWithDamagePoints {
  readonly type: EquipmentType;

  getSkillEnhancers(id: string): IDecoratorsSet<SkillContext>;
}
