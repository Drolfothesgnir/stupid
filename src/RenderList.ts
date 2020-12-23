import HashList from "./utilities/HashList.js";

export default class RenderList<T extends Element> {
  private list: HashList<T>;
  private wrapper?: HTMLElement;

  constructor(elements: ArrayLike<T> = [], wrapper?: HTMLElement) {
    this.list = new HashList(elements);
    this.wrapper = wrapper;
  }

  static apply = apply;

  prepend(element: T) {
    const ok = this.list.prepend(element);

    if (ok && this.rendered) {
      if (this.length > 1) {
        this.list.firstNode!.next!.value.insertAdjacentElement(
          "beforebegin",
          element
        );
      } else {
        this.wrapper!.appendChild(element);
      }
    }
  }

  append(element: T) {
    const ok = this.list.append(element);

    if (ok && this.rendered) {
      if (this.length > 1) {
        this.list.lastNode!.prev!.value.insertAdjacentElement(
          "afterend",
          element
        );
      } else {
        this.wrapper!.appendChild(element);
      }
    }
  }

  clear() {
    this.list.clear();

    if (this.rendered) {
      this.wrapper!.innerHTML = "";
    }
  }

  forEach(cb: (element: T) => void) {
    this.list.traverse(cb);
  }

  remove(id: string | number) {
    const removed = this.list.remove(id);

    if (removed && this.rendered) {
      this.wrapper!.removeChild(removed);
    }

    return removed;
  }

  render(wrapper: HTMLElement) {
    this.wrapper = wrapper;
    const fragment = document.createDocumentFragment();
    this.list.traverse((element) => fragment.appendChild(element));
    wrapper.appendChild(fragment);
  }

  replace(element: T) {
    const replaced = this.list.replace(element);

    if (replaced && this.rendered) {
      this.wrapper!.replaceChild(element, replaced);
    }
  }

  sort(compareFn: (a: T, b: T) => boolean) {
    this.list.sort(compareFn);

    if (this.rendered) {
      this.list.traverse((el) => this.wrapper!.appendChild(el));
    }
  }

  get rendered() {
    return !!this.wrapper;
  }

  get length() {
    return this.list.length;
  }
}

function apply<T extends HTMLElement>(root: HTMLElement) {
  const items = root.children as ArrayLike<unknown>;
  return new RenderList<T>(items as ArrayLike<T>, root);
}
