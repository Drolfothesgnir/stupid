import CStats from "../Stats/CStats";

export type CharStats = {
  strength: number;
  health: number;
};

export function getDefaultCharStats(): CharStats {
  return {
    strength: 0,
    health: 0
  }
}

export default class CCharStats extends CStats<CharStats> {
  static getDefaultCharStats = getDefaultCharStats
  static New(stats: Partial<CharStats> = {}) {
    const values = {...getDefaultCharStats(), ...stats}
    return new CCharStats(values)
  }
}