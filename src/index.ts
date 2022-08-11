import { Character } from "./Game/Character.js";
import { Damage } from "./Game/Damage.js";
import { Item, ItemType } from "./Game/Item.js";

const char = Character.New({ stats: { strength: 10 } });

const item = Item.New();

console.log(item, char);
