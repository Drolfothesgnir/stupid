import DLL, { ListNode } from "./utilities/DoublyLinkedList.js";

function renderBeforeNext<T extends HTMLElement>(node: ListNode<T>) {
  node.next!.value.insertAdjacentElement("beforebegin", node.value);
}

function renderAfterPrev<T extends HTMLElement>(node: ListNode<T>) {
  node.prev!.value.insertAdjacentElement("afterend", node.value);
}

export default class List<T extends HTMLElement> {
  private list: DLL<T>;
  private map: { [key: string]: ListNode<T> };
  private rendered: boolean = false;
  constructor(initial: T[]) {
    this.list = new DLL<T>();
    this.map = {};
    for (let i = 0; i < initial.length; i++) {
      const node = DLL.createNode(initial[i]);
      this.map[initial[i].id] = node;
      this.list.append(node);
    }
  }

  private prepareNode(element: T) {
    const node = DLL.createNode(element);
    this.map[element.id] = node;
    return node;
  }

  has(key: string) {
    return this.map.hasOwnProperty(key);
  }

  prepend(element: T) {
    if (!this.has(element.id)) {
      const node = this.prepareNode(element);
      this.list.prepend(node);

      if (this.rendered) {
        renderBeforeNext(node);
      }
    }
    // else ERROR
  }

  append(element: T) {
    if (!this.has(element.id)) {
      const node = this.prepareNode(element);
      this.list.append(node);

      if (this.rendered) {
        renderAfterPrev(node);
      }
    }
    // else ERROR
  }

  insertBefore(key: string, element: T) {
    if (this.has(key)) {
      const node = this.prepareNode(element);
      this.list.insertBefore(this.map[key], node);

      if (this.rendered) {
        renderBeforeNext(node);
      }
    }
    // else ERROR
  }

  insertAfter(key: string, element: T) {
    if (this.has(key)) {
      const node = this.prepareNode(element);
      this.list.insertAfter(this.map[key], node);

      if (this.rendered) {
        renderAfterPrev(node);
      }
    }
    // else ERROR
  }

  insert(index: number, element: T) {
    const found = this.list.get(index);
    if (found) {
      this.insertBefore(found.value.id, element);
    }
    // else ERROR
  }

  remove(key: number | string) {
    let found;

    if (typeof key == "number") {
      found = this.list.get(key);
    } else {
      found = this.map[key];
    }

    if (found) {
      this.list.remove(found);
      delete this.map[found.value.id];

      if (this.rendered) {
        found.value.parentElement!.removeChild(found.value);
      }
    }
    // else ERROR
  }

  sort(compareFn: (a: T, b: T) => boolean) {
    this.list = this.list.sort(compareFn);

    if (this.rendered) {
      this.list.traverse((element) =>
        element.parentElement!.appendChild(element)
      );
    }
  }

  render(root: HTMLElement) {
    if (!this.rendered && !this.list.isEmpty) {
      const fragment = document.createDocumentFragment();
      this.list.traverse((element) => fragment.appendChild(element));
      root.appendChild(fragment);
      this.rendered = true;
    }
  }

  clear() {
    if (this.rendered) {
      this.list.head!.value.parentElement!.innerHTML = "";
      this.rendered = false;
    }

    this.list.clear();
    this.map = {};
  }
}
