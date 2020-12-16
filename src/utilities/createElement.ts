export default function createElement<K extends keyof HTMLElementTagNameMap>(
  type: K,
  attributes: { [key: string]: string | boolean } = {},
  children: (Node | string)[] = [],
  rawProps: { [key: string]: any } = {}
) {
  const element = document.createElement(type);

  for (let key in attributes) {
    element.setAttribute(key, attributes[key].toString());
  }

  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (typeof children[i] === "string") {
      child = document.createTextNode(children[i] as string);
    }
    element.appendChild(child as Node);
  }

  for (let key in rawProps) {
    (element as { [key: string]: any })[key] = rawProps[key];
  }

  return element;
}
