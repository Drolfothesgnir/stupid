import createComposite from "./utilities/createComposite.js";
import createElement from "./utilities/createElement.js";
import State from "./State.js";
import createInput from "./Input.js";

const base = 10;

let state = new State("1488");
const input = createInput({
  onChange: value => state.update(value),
  config: { name: "name", value: state.value, type: "number" },
});
const text = createElement("h1", { class: "text" }, [
  (+state.value).toString(base),
]);

const update = createComposite(input.aug.updateValue)
  .add((value) => (text.innerText = (+value).toString(base)));

state.addHandler(update);

const root = document.getElementById("root")!;
root.appendChild(input);
root.appendChild(text);
