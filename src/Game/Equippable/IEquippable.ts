import IEntity from "../Entity/IEntity";
import IWithStatBonuses from "../WithStatBonuses";

export enum EquipmentType {
  WEAPON = 'WEAPON',
  ARMOR = 'ARMOR'
}

export default interface IEquippable extends IEntity, IWithStatBonuses {
  readonly type: EquipmentType;
}
