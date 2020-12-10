type Handler = (...args: any[]) => void;

export default function createComposite(fn?: Handler) {
  let handlers = fn ? [fn] : [];

  function trigger(this: any) {
    for (let i = 0; i < handlers.length; i++) {
      (handlers[i].apply as (context: any, args: IArguments) => void)(
        this,
        arguments
      );
    }
  }

  trigger.add = function (handler: Handler) {
    handlers.push(handler);
    return trigger;
  };

  trigger.remove = function (handler: Handler) {
    handlers = handlers.filter((f) => f !== handler);
    return trigger;
  };

  return trigger;
}
