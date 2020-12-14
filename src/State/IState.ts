export type StateHandler<T> = (value: T) => void;

export default interface IState<T> {
  readonly value: T;

  update(item: T | ((value: T) => T)): void;

  addHandler(handler: StateHandler<T>): void;

  removeHandler(handler: StateHandler<T>): void;

  clearHandlers(): void;
}
