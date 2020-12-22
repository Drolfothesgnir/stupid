import RenderList from "./RenderList.js";
import createElement from "./utilities/createElement.js";

let i = 0;

function createItem() {
  return createElement("h3", { id: (i++).toString() }, [i.toString()]);
}

const list = new RenderList();
list.append(createItem());
list.append(createItem());
list.append(createItem());
list.append(createItem());
list.render(document.getElementById("root")!);
console.log(list.rendered, list);
console.log(list.remove(2));
