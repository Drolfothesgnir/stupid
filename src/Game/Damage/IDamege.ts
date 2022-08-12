import IStats from "../Stats/IStats";

export type DamageProps = {
  physical: number;
  elemental_fire: number;
};

export default interface IDamage extends IStats<DamageProps> {
  valueOf(): number;
}
