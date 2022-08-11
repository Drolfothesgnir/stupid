import { Entity, EntityProps } from "./Entity.js";
import { OptionalProps } from "./utils.js";

export enum ItemType {
  WEAPON = "WEAPON",
  ARMOR = "ARMOR",
  OTHER = "OTHER"
}

export class Item extends Entity {
  static New(props: OptionalProps<EntityProps> & {type: ItemType } = {type: ItemType.OTHER}) {
    return super.New(props)
  }
}