type Handler = (...args: any[]) => void;

export type CompositeTrigger = {
  (...value: any): void;
  handlers: Handler[];
  add(this: CompositeTrigger, handler: Handler): CompositeTrigger;
  remove(this: CompositeTrigger, handler: Handler): CompositeTrigger;
};

function add(this: CompositeTrigger, handler: Handler) {
  this.handlers.push(handler);
  return this;
}

function remove(this: CompositeTrigger, handler: Handler) {
  this.handlers = this.handlers.filter((f) => f !== handler);
  return this;
}

function clear(this: CompositeTrigger) {
  this.handlers.length = 0;
}

export default function createComposite(fn?: Handler): CompositeTrigger {
  let handlers = fn ? [fn] : [];

  function trigger(this: any) {
    for (let i = 0; i < handlers.length; i++) {
      (handlers[i].apply as (context: any, args: IArguments) => void)(
        this,
        arguments
      );
    }
  }

  trigger.handlers = handlers;

  trigger.add = add;

  trigger.remove = remove;

  trigger.clear = clear;

  return trigger;
}
