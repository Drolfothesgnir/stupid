import DLL, { ListNode } from "./utilities/DoublyLinkedList.js";

export type ElementWithKey<T extends HTMLElement> = T & {
  __key: string;
};

function renderBeforeNext<T extends HTMLElement>(
  node: ListNode<ElementWithKey<T>>
) {
  node.next!.value.insertAdjacentElement("beforebegin", node.value);
}

function renderAfterPrev<T extends HTMLElement>(
  node: ListNode<ElementWithKey<T>>
) {
  node.prev!.value.insertAdjacentElement("afterend", node.value);
}

export default class List<T extends HTMLElement> {
  private list: DLL<ElementWithKey<T>>;
  private map: { [key: string]: ListNode<ElementWithKey<T>> };
  private rendered: boolean = false;
  constructor(initial: ElementWithKey<T>[]) {
    this.list = new DLL<ElementWithKey<T>>();
    this.map = {};
    for (let i = 0; i < initial.length; i++) {
      const node = DLL.createNode(initial[i]);
      this.map[initial[i].__key] = node;
      this.list.append(node);
    }
  }

  has(key: string) {
    return this.map.hasOwnProperty(key);
  }

  private prepareNode(element: ElementWithKey<T>) {
    const node = DLL.createNode(element);
    this.map[element.__key] = node;
    return node;
  }

  prepend(element: ElementWithKey<T>) {
    if (!this.has(element.__key)) {
      const node = this.prepareNode(element);
      this.list.prepend(node);

      if (this.rendered) {
        renderBeforeNext(node);
      }
    }
    // else ERROR
  }

  append(element: ElementWithKey<T>) {
    if (!this.has(element.__key)) {
      const node = this.prepareNode(element);
      this.list.append(node);

      if (this.rendered) {
        renderAfterPrev(node);
      }
    }
    // else ERROR
  }

  insertBefore(key: string, element: ElementWithKey<T>) {
    if (this.has(key)) {
      const node = this.prepareNode(element);
      this.list.insertBefore(this.map[key], node);

      if (this.rendered) {
        renderBeforeNext(node);
      }
    }
    // else ERROR
  }

  insertAfter(key: string, element: ElementWithKey<T>) {
    if (this.has(key)) {
      const node = this.prepareNode(element);
      this.list.insertAfter(this.map[key], node);

      if (this.rendered) {
        renderAfterPrev(node);
      }
    }
  }

  insert(index: number, element: ElementWithKey<T>) {
    const found = this.list.get(index);
    if (found) {
      this.insertBefore(found.value.__key, element);
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
      delete this.map[found.value.__key];

      if (this.rendered) {
        found.value.parentElement!.removeChild(found.value);
      }
    }
  }

  sort(compareFn: (a: ElementWithKey<T>, b: ElementWithKey<T>) => boolean) {
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
