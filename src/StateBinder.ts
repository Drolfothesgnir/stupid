import DState from "./State/DroppableState.js";
import IDroppable from "./IDroppable.js";
import createComposite, {
  CompositeTrigger,
} from "./utilities/createComposite.js";

export default class StateBinder<T, U> implements IDroppable {
  private item?: T;
  private callback?: CompositeTrigger;
  private state?: DState<U>;
  constructor(item: T, state: DState<U>) {
    this.item = item;
    this.state = state;
  }

  addHandler(factory: (item: T) => (value: U) => void) {
    if (!this.dropped) {
      const handler = factory(this.item!);
      if (!this.callback) {
        this.callback = createComposite();
        this.state!.addHandler(this.callback);
      }
      this.callback.add(handler);
    }
  }

  drop() {
    if (this.callback) {
      this.state!.removeHandler(this.callback);
    }
    delete this.item;
    delete this.callback;
    delete this.state;
  }

  get dropped() {
    return this.state === undefined || this.state.dropped;
  }
}
