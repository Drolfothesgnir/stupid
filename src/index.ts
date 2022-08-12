import CEquippable from "./Game/Equippable/CEquippable";
import { EquipmentType } from "./Game/Equippable/IEquippable";


const item = CEquippable.New({name: 'Sword', type: EquipmentType.WEAPON})
console.log(item);
