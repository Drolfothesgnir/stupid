import { CharStats } from "../CharStats"
import IDamage from "../Damage/IDamege"
import IStats from "../Stats/IStats"

export default interface IWithStatBonuses {
  applyStatBonus(stats: IStats<CharStats>): IStats<CharStats>
}