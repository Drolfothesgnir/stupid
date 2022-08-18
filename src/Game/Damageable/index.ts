import IDamage from "../Damage/IDamege"
import IEntity from "../Entity/IEntity";
import IStats from "../Stats/IStats";

export type VitalityProps = {
  health: number;
  magic: number;
}

export interface IVitalityStats<T extends Record<string, number>> extends IStats<T> {
  valueOf(): number;

  finalize(): IVitalityStats<T>;
}

export interface IRestoration extends IVitalityStats<Partial<VitalityProps>> {}

export interface IDamageable extends IEntity {
  isDead(): boolean

  attack(damage: IDamage): void;
  
  restore(restoration: IRestoration): void
  
  getVitalityStats(): VitalityProps
}