import IState, { StateHandler } from "./IState.js";

function runCallbacks<T>(callbacks: StateHandler<T>[], value: T) {
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i](value);
  }
}

export default class State<T> implements IState<T> {
  private _value: T;
  private timerId: number | null = null;
  private callbacks: StateHandler<T>[] = [];
  constructor(init: T) {
    this._value = init;
  }

  private activateCallbacks() {
    if (this.timerId === null) {
      this.timerId = setTimeout(() => {
        runCallbacks(this.callbacks, this._value);
        this.timerId = null;
      }, 0);
    }
  }

  update(item: T | ((value: T) => T)) {
    if (typeof item == "function") {
      this._value = (item as (value: T) => T)(this._value);
    } else {
      this._value = item;
    }

    this.activateCallbacks();
  }

  addHandler(handler: StateHandler<T>) {
    this.callbacks.push(handler);
  }

  removeHandler(handler: StateHandler<T>) {
    this.callbacks = this.callbacks.filter((f) => f !== handler);
  }

  clearHandlers() {
    this.callbacks = [];
  }

  get value() {
    return this._value;
  }
}
