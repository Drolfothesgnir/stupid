import DLL, { ListNode } from "./DoublyLinkedList.js";

type Item<T> = T & { id: string };

export default class HashList<T> {
  private map: { [key: string]: ListNode<Item<T>> } = {};
  private list: DLL<Item<T>> = new DLL();

  has(key: string) {
    return this.map[key] !== undefined;
  }

  prepend(value: Item<T>) {
    if (!this.has(value.id)) {
      const node = DLL.createNode(value);
      this.map[value.id] = node;
      this.list.prepend(node);
      return true;
    }

    return false;
  }

  append(value: Item<T>) {
    if (!this.has(value.id)) {
      const node = DLL.createNode(value);
      this.map[value.id] = node;
      this.list.append(node);
      return true;
    }

    return false;
  }

  insertBefore(key: string, value: Item<T>) {
    if (this.has(key) && !this.has(value.id)) {
      const node = DLL.createNode(value);
      this.map[value.id] = node;
      this.list.insertBefore(this.map[key], node);
      return true;
    }

    return false;
  }

  insertAfter(key: string, value: Item<T>) {
    if (this.has(key) && !this.has(value.id)) {
      const node = DLL.createNode(value);
      this.map[value.id] = node;
      this.list.insertAfter(this.map[key], node);
      return true;
    }

    return false;
  }

  remove(key: string) {
    if (this.has(key)) {
      this.list.remove(this.map[key]);
      delete this.map[key];
      return true;
    }

    return false;
  }

  removeFirst() {
    const removed = this.list.removeHead();
    if (removed) {
      delete this.map[removed.value.id];
      return removed.value;
    }

    return null;
  }

  removeLast() {
    const removed = this.list.removeTail();
    if (removed) {
      delete this.map[removed.value.id];
      return removed.value;
    }

    return null;
  }

  replace(key: string, value: Item<T>) {
    if (this.has(key)) {
      this.map[key].value = value;
      return true;
    }

    return false;
  }

  clear() {
    this.list.clear();
    this.map = {};
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
}
