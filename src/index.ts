import CCharacter from "./Game/Character";
import CCharStats, { CharStats } from "./Game/CharStats";
import CDamage from "./Game/Damage/CDamage";
import CDecoratorSet from "./Game/DecoratorsSet/CDecoratorSet";
import CEquipment from "./Game/Equipment";
// import CEquipment from "./Game/Equipment";
import CEquippable from "./Game/Equippable/CEquippable";
import { EquipmentType } from "./Game/Equippable/IEquippable";
import Melee from "./Game/Skill/Melee";
import BaseStatDecorator from "./Game/Stats/BaseStatDecorator";
import CStats from "./Game/Stats/CStats";
import FactorStatDecorator from "./Game/Stats/FactorStatDecorator";
import IStats from "./Game/Stats/IStats";


const armor = CEquippable.New({
  name: "Armor 1",
  type: EquipmentType.ARMOR,
  health: 50,
  strength: 50,
});
const weaponLeft = CEquippable.New({
  name: "Weapon left",
  type: EquipmentType.WEAPON,
  health: 25,
  strength: 25,
});
const weaponRight = CEquippable.New({
  name: "Weapon right",
  type: EquipmentType.WEAPON,
  health: 25,
  strength: 25,
});

const Tolik = new CCharacter({
  name: "tolik",
  id: "tolik",
  equipment: { [EquipmentType.WEAPON]: 2, [EquipmentType.ARMOR]: 1 },
  level: 1,
  stats: { health: 100, intelligence: 10, strength: 10, magic: 50 },
});
const Slavik = new CCharacter({
  name: "slavik",
  id: "slavik",
  equipment: {},
  level: 1,
  stats: { health: 100, intelligence: 10, strength: 10, magic: 50 },
});
Tolik.equip(weaponLeft);
Tolik.equip(weaponRight);
Tolik.equip(armor);
const meele = new Melee();
meele.use(Tolik, Slavik);
console.log(Tolik, Slavik.isDead());
