export interface Augmented {
  aug: { [key: string]: any };
}

export default function augmentElement<T extends HTMLElement>(
  element: T | (T & Augmented),
  props: { [key: string]: any }
): T & Augmented {
  const aug = (element as T & Augmented).aug || {};
  for (let key in props) {
    aug[key] = props[key];
  }
  (element as T & Augmented).aug = aug;
  return element as T & Augmented;
}
