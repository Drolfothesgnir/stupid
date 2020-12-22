import HashList from "./utilities/HashList.js";

export default class RenderList<T extends HTMLElement> {
  private list: HashList<T> = new HashList();
  private wrapper: HTMLElement | null = null;

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

  get rendered() {
    return !!this.wrapper;
  }

  get length() {
    return this.list.length;
  }
}
