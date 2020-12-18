import List, { ElementWithKey } from "./List.js";
import createElement from "./utilities/createElement.js";

const label = document.getElementById("label")! as HTMLInputElement;
const submit = document.getElementById("submit")!;
const listElement = document.getElementById("listElement")!;
const renderButton = document.getElementById("render")!;

const items = [];
for (let i = 0; i < 100; i++) {
  const el = createElement(
    "li",
    { "data-index": Math.floor(Math.random() * 1000).toString() },
    [i.toString()],
    { __key: i }
  );
  items[i] = el as ElementWithKey<HTMLLIElement>;
}

const list = new List(items);
list.render(listElement);
submit.onclick = () =>
  list.sort((a, b) => a.dataset.index! <= b.dataset.index!);
renderButton.onclick = () => {
  list.clear();
  console.log(list);
};
