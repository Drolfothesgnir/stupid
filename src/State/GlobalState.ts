import { StateHandler } from "./IState.js";
import State from "./State.js";

const registry: { [key: string]: State<any>; [index: number]: State<any> } = {};

export function createState<T>(key: string | number, init: T) {
  if (!registry[key]) {
    registry[key] = new State(init);
  }
  // else ERROR
}

export function removeState(key: string | number) {
  delete registry[key];
}

export function updateState<T>(
  key: string | number,
  value: T | ((value: T) => T)
) {
  if (registry[key]) {
    registry[key].update(value);
  }
  // else ERROR
}

export function addHandlerToState<T>(
  key: string | number,
  handler: StateHandler<T>
) {
  if (registry[key]) {
    registry[key].addHandler(handler);
  }
  // else ERROR
}

export function removeHandlerFromState<T>(
  key: string | number,
  handler: StateHandler<T>
) {
  if (registry[key]) {
    registry[key].removeHandler(handler);
  }
  // else ERROR
}

export function getStateValue<T>(key: string | number) {
  if (registry[key]) {
    return registry[key].value as T;
  }
  // else ERROR
}

const GlobalState = {
  create: createState,
  remove: removeState,
  update: updateState,
  addHandler: addHandlerToState,
  removeHandler: removeHandlerFromState,
  getValue: getStateValue,
};

export default GlobalState;
