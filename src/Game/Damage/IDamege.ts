import { IVitalityStats } from "../Damageable";

export type DamageProps = {
  physical: number;
  elemental_fire: number;
};

export default interface IDamage extends IVitalityStats<Partial<DamageProps>> {}
