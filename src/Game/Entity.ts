import { Damage } from "./Damage.js";
import { DecoratorsArray } from "./DecoratorsArray.js";
import { OptionalProps } from "./utils.js";

export type Stats = {
  strength: number;
};

export type MainProps = {
  health: number;
};

export type EntityProps = {
  mainProps: MainProps;
  stats: Stats;
};

export class Entity {
  values: EntityProps;
  modifiedValues: EntityProps;
  attackDecorators: DecoratorsArray<Damage> = new DecoratorsArray();
  defenseDecorators: DecoratorsArray<Damage> = new DecoratorsArray();

  constructor(props: EntityProps) {
    this.values = props;
    this.modifiedValues = props;
  }

  static getDefaultCharProps(): EntityProps {
    return {
      mainProps: {
        health: 0,
      },
      stats: {
        strength: 0,
      },
    };
  }

  static New(props?: OptionalProps<EntityProps>) {
    let config;
    if (props) {
      config = { ...Entity.getDefaultCharProps(), ...props };
    } else {
      config = Entity.getDefaultCharProps();
    }
    return new this(config);
  }

  resetModifiedValues() {
    this.modifiedValues = this.values
  }

  /* accessing ORIGINAL stats */

  getOriginalStat(key: keyof Stats) {
    return this.values.stats[key];
  }

  setOriginalStat(key: keyof Stats, value: number) {
    this.values.stats[key] = value;
  }

  changeOriginalStat(key: keyof Stats, value: number) {
    this.values.stats[key] += value;
  }

  /* -------------------------------------------END------------------------------------------- */

  /* accessing ORIGINAL main props */

  setOriginalMainProp(key: keyof MainProps, value: number) {
    this.values.mainProps[key] = value;
  }

  getOriginalMainProp(key: keyof MainProps) {
    return this.values.mainProps[key];
  }

  changeOriginalMainProp(key: keyof MainProps, value: number) {
    this.values.mainProps[key] += value;
  }

  /* -------------------------------------------END------------------------------------------- */

  /* accessing MODIFIED stats */

  getStat(key: keyof Stats) {
    return this.modifiedValues.stats[key];
  }

  setStat(key: keyof Stats, value: number) {
    this.modifiedValues.stats[key] = value;
  }

  changeStat(key: keyof Stats, value: number) {
    this.modifiedValues.stats[key] += value;
  }

  /* -------------------------------------------END------------------------------------------- */

  /* accessing MODIFIED main props */

  setMainProp(key: keyof MainProps, value: number) {
    this.modifiedValues.mainProps[key] = value;
  }

  getMainProp(key: keyof MainProps) {
    return this.modifiedValues.mainProps[key];
  }

  changeMainProp(key: keyof MainProps, value: number) {
    this.modifiedValues.mainProps[key] += value;
  }

  /* -------------------------------------------END------------------------------------------- */
}
