import { CharStats } from "../CharStats";
import { IDamageable } from "../Damageable";

export interface Character extends IDamageable {
  getStats(): CharStats;
  getOriginalStats(): CharStats;
  
}