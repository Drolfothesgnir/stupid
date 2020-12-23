import DLL, { ListNode } from "./DoublyLinkedList.js";

type Item<T> = T & { id: string | number };

export default class HashList<T> {
  private map: { [key: string]: ListNode<Item<T>> };
  private list: DLL<Item<T>>;
  private _length: number;

  constructor(items: ArrayLike<Item<T>> = []) {
    this.map = {};
    this.list = new DLL();

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.id === undefined) {
        throw new Error("Item has no id!");
      }

      if (this.has(item.id)) {
        throw new Error(`Duplicate id: ${item.id}`);
      }

      const node = DLL.createNode(item);
      this.map[item.id] = node;
      this.list.append(node);
    }

    this._length = items.length;
  }

  has(key: string | number) {
    return this.map[key] !== undefined;
  }

  prepend(value: Item<T>) {
    if (!this.has(value.id)) {
      const node = DLL.createNode(value);
      this.map[value.id] = node;
      this.list.prepend(node);
      this._length++;
      return true;
    }

    return false;
  }

  append(value: Item<T>) {
    if (!this.has(value.id)) {
      const node = DLL.createNode(value);
      this.map[value.id] = node;
      this.list.append(node);
      this._length++;
      return true;
    }

    return false;
  }

  insertBefore(key: string | number, value: Item<T>) {
    if (this.has(key) && !this.has(value.id)) {
      const node = DLL.createNode(value);
      this.map[value.id] = node;
      this.list.insertBefore(this.map[key], node);
      this._length++;
      return true;
    }

    return false;
  }

  insertAfter(key: string | number, value: Item<T>) {
    if (this.has(key) && !this.has(value.id)) {
      const node = DLL.createNode(value);
      this.map[value.id] = node;
      this.list.insertAfter(this.map[key], node);
      this._length++;
      return true;
    }

    return false;
  }

  get(key: string | number) {
    if (this.has(key)) {
      return this.map[key].value;
    }

    return null;
  }

  remove(key: string | number) {
    if (this.has(key)) {
      const result = this.map[key].value;
      this.list.remove(this.map[key]);
      delete this.map[key];
      this._length--;
      return result;
    }

    return null;
  }

  removeFirst() {
    const removed = this.list.removeHead();
    if (removed) {
      delete this.map[removed.value.id];
      this._length--;
      return removed.value;
    }

    return null;
  }

  removeLast() {
    const removed = this.list.removeTail();
    if (removed) {
      delete this.map[removed.value.id];
      this._length--;
      return removed.value;
    }

    return null;
  }

  replace(value: Item<T>) {
    if (this.has(value.id)) {
      const replaced = this.map[value.id].value;
      this.map[value.id].value = value;
      return replaced;
    }

    return null;
  }

  clear() {
    this.list.clear();
    this.map = {};
    this._length = 0;
    return true;
  }

  traverse(cb: (value: Item<T>) => void) {
    this.list.traverse(cb);
  }

  sort(compareFn: (a: Item<T>, b: Item<T>) => boolean) {
    this.list = this.list.sort(compareFn);
  }

  get isEmpty() {
    return this.list.isEmpty;
  }

  get length() {
    return this._length;
  }

  get firstNode() {
    return this.list.head;
  }

  get lastNode() {
    return this.list.tail;
  }
}
