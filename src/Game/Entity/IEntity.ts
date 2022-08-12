export default interface IEntity {
  readonly id: string;
  readonly name: string;
  level: number;
}

export type EntityProps = {
  id: string;
  name: string;
  level: number;
}