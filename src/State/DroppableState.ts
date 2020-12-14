import IState, { StateHandler } from "./IState.js";
import IDroppable from "../IDroppable.js";
import State from "./State.js";

export default class DroppableState<T> implements IState<T>, IDroppable {
  private __inner?: State<T>;

  constructor(init: T) {
    this.__inner = new State(init);
  }

  update(item: T | ((value: T) => T)) {
    this.__inner?.update(item);
  }

  addHandler(handler: StateHandler<T>) {
    this.__inner?.addHandler(handler);
  }

  removeHandler(handler: StateHandler<T>) {
    this.__inner?.removeHandler(handler);
  }

  clearHandlers() {
    this.__inner?.clearHandlers();
  }

  drop() {
    delete this.__inner;
  }

  get value() {
    return this.__inner?.value as T;
  }

  get dropped() {
    return this.__inner === undefined;
  }
}
