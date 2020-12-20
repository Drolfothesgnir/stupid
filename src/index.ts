import List from "./List.js";
import State from "./State/State.js";
import createElement from "./utilities/createElement.js";

const items = [1, 2, 3].map((n) =>
  createElement("h2", { id: n.toString() }, [n.toString()])
);

const list = new List(items);
list.render(document.getElementById("root")!);

list.replace("2", createElement("h1", { id: "foof" }, ["hello"]));
