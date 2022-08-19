export type DamagePoints = number

export default interface IWithDamagePoints {
  getDamagePoints(): DamagePoints;
}