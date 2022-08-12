import { CharStats } from "../CharStats";
import IDamage from "../Damage/IDamege";
import IDecoratorsSet from "../DecoratorsSet/IDecoratorsSet";
import IEntity from "../Entity/IEntity";
import IStats from "../Stats/IStats";

export enum EquipmentType {
  WEAPON = 'WEAPON',
  ARMOR = 'ARMOR'
}

export default interface IEquippable extends IEntity {
  readonly stats: IStats<CharStats>;
  readonly type: EquipmentType;
  attackDecorators: IDecoratorsSet<IDamage>;
  defenseDecorators: IDecoratorsSet<IDamage>;
  statDecorators: IDecoratorsSet<IStats<CharStats>>;
}