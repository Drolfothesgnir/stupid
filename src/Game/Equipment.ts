import { Character } from "./Character";
import { Item, ItemType } from "./Item.js";

export class Equipment {
  [ItemType.WEAPON]: Item | null = null;
  [ItemType.ARMOR]: Item | null = null;
  character: Character;

  constructor(character: Character){
    this.character = character;
  }

  equip(where: ItemType.WEAPON | ItemType.ARMOR, item: Item) {
    
  }
}