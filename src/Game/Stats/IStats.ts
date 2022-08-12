export default interface IStats<T extends {[key:string]: number}> {
  getValues(): T;

  setValues(values: T): void;

  getValue(key: keyof T): number;

  setValue(key: keyof T, value: number): void;

  changeValue(key: keyof T, value: number): void;

  changeValueByFactor(key: keyof T, factor: number): void;
}
