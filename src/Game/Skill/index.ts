import { Character } from "../Character";
import { CharStats } from "../CharStats";
import IDamage from "../Damage/IDamege";
import { IRestoration, VitalityProps } from "../Damageable";
import IDecoratorsSet from "../DecoratorsSet/IDecoratorSet";

export type SkillContext = {
  user: Character,
  target: Character,
  damage?: IDamage,
  additionalDamage?: IDamage[],
  restoration?: IRestoration,
  additionalRestoration?: IRestoration[]
}

export type SkillEnhancers = {
  all?: IDecoratorsSet<SkillContext>;
  [key:string]: IDecoratorsSet<SkillContext> | undefined;
}

export type SkillRequirements = Partial<VitalityProps & CharStats & {level: number}>

export interface Skill {
  readonly id: string;
  readonly name: string;
  getRequirements(): {
    user?: SkillRequirements,
    target?: SkillRequirements
  };
  use(user: Character, target: Character): void
}