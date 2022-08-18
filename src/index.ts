import CCharStats, { CharStats } from "./Game/CharStats";
import CDamage from "./Game/Damage/CDamage";
import CDecoratorSet from "./Game/DecoratorsSet/CDecoratorSet";
import CEquipment from "./Game/Equipment";
// import CEquipment from "./Game/Equipment";
import CEquippable from "./Game/Equippable/CEquippable";
import { EquipmentType } from "./Game/Equippable/IEquippable";
import BaseStatDecorator from "./Game/Stats/BaseStatDecorator";
import CStats from "./Game/Stats/CStats";
import FactorStatDecorator from "./Game/Stats/FactorStatDecorator";
import IStats from "./Game/Stats/IStats";



const stats = CCharStats.New()
const armor = CEquippable.New({name: "Armor 1", type: EquipmentType.ARMOR, health: 50, strength: 50})
const weaponLeft = CEquippable.New({ name: 'Weapon left', type: EquipmentType.WEAPON, health: 25, strength: 25})
const weaponRight = CEquippable.New({ name: 'Weapon right', type: EquipmentType.WEAPON, health: 25, strength: 25})
const equipment = new CEquipment({ [EquipmentType.ARMOR]: 1, [EquipmentType.WEAPON]: 2})
equipment.equip(armor)
equipment.equip(weaponLeft, 1)
equipment.equip(weaponRight)
console.log(equipment, stats, equipment.applyStatBonus(stats));
