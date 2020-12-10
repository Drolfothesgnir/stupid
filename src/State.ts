function runCallbacks<T>(callbacks: ((value: T) => void)[], value: T) {
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i](value);
  }
}

export default class State<T> {
  private _value: T;
  private timerId: number | null;
  private callbacks: ((value: T) => void)[];
  constructor(init: T) {
    this._value = init;
    this.timerId = null;
    this.callbacks = [];
  }

  private activateCallbacks() {
    clearTimeout(this.timerId as number);
    this.timerId = setTimeout(runCallbacks, 0, this.callbacks, this._value);
  }

  update(item: T | ((value: T) => T)) {
    if (typeof item === "function") {
      this._value = (item as (value: T) => T)(this._value);
    } else {
      this._value = item;
    }

    this.activateCallbacks();
  };

  addHandler(handler: (value: T) => void) {
    this.callbacks.push(handler);
  }

  removeHandler(handler: (value: T) => void) {
    this.callbacks = this.callbacks.filter((f) => f !== handler);
  }

  get value() {
    return this._value;
  }
}
