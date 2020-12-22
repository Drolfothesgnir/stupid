import DLL, { ListNode } from "./DoublyLinkedList.js";

type Item<T> = T & { id: string | number };

export default class HashList<T> {
  private map: { [key: string]: ListNode<Item<T>> } = {};
  private list: DLL<Item<T>> = new DLL();
  private _length: number = 0;

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
      this.map[value.id].value = value;
      return true;
    }

    return false;
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
