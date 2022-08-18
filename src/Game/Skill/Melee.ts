import { Skill } from ".";
import { Character } from "../Character";

export default class Melee implements Skill {
  get id() {
    return 'Skill_Melee'
  }

  get name() {
    return 'Melee strike'
  }

  use(user: Character, target: Character) {
    
  }
}