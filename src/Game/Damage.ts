import { OptionalProps } from "./utils.js";

export type DamageProps = {
  physical: number;
  elemental_fire: number;
};

export class Damage {
  values: DamageProps = Damage.getDefaultDamageProps();

  static New(damage?: OptionalProps<DamageProps>) {
    const result = new Damage();
    if (damage) {
      result.values = { ...result.values, ...damage } as DamageProps;
    }
    return result;
  }

  static getDefaultDamageProps(): DamageProps {
    return {
      physical: 0,
      elemental_fire: 0,
    };
  }

  set(key: keyof DamageProps, value: number) {
    this.values[key] = value;
  }

  get(key: keyof DamageProps) {
    return this.values[key];
  }

  valueOf() {
    return Object.values(this.values).reduce((prev, next) => next + prev, 0);
  }
}

export type DamageDecorator = (damage: Damage) => Damage;
