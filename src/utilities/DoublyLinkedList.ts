export type ListNode<T> = {
  value: T;
  prev: ListNode<T> | null;
  next: ListNode<T> | null;
};

function createNode<T>(value: T): ListNode<T> {
  return {
    value,
    next: null,
    prev: null,
  };
}

export default class List<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;

  static createNode = createNode;
  static mergeSorted = mergeSorted;
  static fromArray = fromArray;

  insertAfter(node: ListNode<T>, newNode: ListNode<T>) {
    newNode.prev = node;
    if (!node.next) {
      this.tail = newNode;
    } else {
      newNode.next = node.next;
      node.next.prev = newNode;
    }
    node.next = newNode;
  }

  insertBefore(node: ListNode<T>, newNode: ListNode<T>) {
    newNode.next = node;
    if (!node.prev) {
      this.head = newNode;
    } else {
      newNode.prev = node.prev;
      node.prev.next = newNode;
    }
    node.prev = newNode;
  }

  prepend(newNode: ListNode<T>) {
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.insertBefore(this.head, newNode);
    }
  }

  append(newNode: ListNode<T>) {
    if (!this.tail) {
      this.prepend(newNode);
    } else {
      this.insertAfter(this.tail, newNode);
    }
  }

  remove(node: ListNode<T>) {
    if (!node.prev) {
      this.head = node.next;
    } else {
      node.prev.next = node.next;
    }

    if (!node.next) {
      this.tail = node.prev;
    } else {
      node.next.prev = node.prev;
    }
  }

  traverse(cb: (value: T) => void) {
    let current = this.head;
    while (current) {
      cb(current.value);
      current = current.next;
    }
  }

  traverseBackwards(cb: (value: T) => void) {
    let current = this.tail;
    while (current) {
      cb(current.value);
      current = current.prev;
    }
  }

  getMiddle() {
    if (this.head) {
      let slow = this.head;
      let fast = this.head;
      while (slow.next && fast.next?.next) {
        slow = slow.next;
        fast = fast.next.next;
      }
      return slow;
    }

    return null;
  }

  sort(compareFn: (a: T, b: T) => boolean): List<T> {
    if (!this.head || !this.head.next) {
      return this;
    }

    const left = new List<T>();
    const right = new List<T>();
    const middle = this.getMiddle();

    left.head = this.head;
    left.tail = middle;

    right.head = middle!.next;
    right.tail = this.tail;

    left.tail!.next = null;
    right.head!.prev = null;

    return mergeSorted(left.sort(compareFn), right.sort(compareFn), compareFn);
  }

  toArray() {
    const result = [];
    let current = this.head,
      i = 0;
    while (current) {
      result[i++] = current.value;
      current = current.next;
    }
    return result;
  }

  get(index: number) {
    let current = this.head;
    let i = 0;
    while (current !== null) {
      if (index === i++) {
        return current;
      }
      current = current!.next;
    }
    return null;
  }

  clear() {
    this.head = null;
    this.tail = null;
  }

  get isEmpty() {
    return this.head === null;
  }
}

function mergeSorted<T>(
  a: List<T>,
  b: List<T>,
  compareFn: (a: T, b: T) => boolean
) {
  const result = new List<T>();
  let first = a.head;
  let second = b.head;

  while (first && second) {
    if (compareFn(first.value, second.value)) {
      result.append(first);
      first = first.next;
    } else {
      result.append(second);
      second = second.next;
    }

    result.tail!.next = null;
  }

  if (first) {
    result.tail!.next = first;
    first.prev = result.tail;
    result.tail = a.tail;
  }

  if (second) {
    result.tail!.next = second;
    second.prev = result.tail;
    result.tail = b.tail;
  }

  return result;
}

function fromArray<T>(array: T[]) {
  const result = new List<T>();
  if (array.length) {
    let current = createNode(array[0]);
    result.head = current;
    for (let i = 1; i < array.length; i++) {
      current.next = createNode(array[i]);
      current.next.prev = current;
      current = current.next;
    }
    result.tail = current;
  }
  return result;
}
