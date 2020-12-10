type Callback<T> = (value: T) => void;

function runCallbacks<T>(callbacks: Callback<T>[], value: T) {
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i](value);
  }
}

export default class State<T> {
  private _value: T;
  private timerId: number | null;
  private callbacks: Callback<T>[];
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
  }

  addHandler(handler: Callback<T>) {
    this.callbacks.push(handler);
  }

  removeHandler(handler: Callback<T>) {
    this.callbacks = this.callbacks.filter((f) => f !== handler);
  }

  get value() {
    return this._value;
  }
}
