export default function createElement<K extends keyof HTMLElementTagNameMap>(
  type: K,
  config: { [key: string]: string | boolean } = {},
  children: (Node | string)[] = []
) {
  const element = document.createElement(type);

  for (let key in config) {
    element.setAttribute(key, config[key].toString());
  }

  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (typeof children[i] === "string") {
      child = document.createTextNode(children[i] as string);
    }
    element.appendChild(child as Node);
  }

  return element;
}
