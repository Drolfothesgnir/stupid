import createComposite from "./utilities/createComposite.js";
import createElement from "./utilities/createElement.js";
import State from "./State.js";
import Input from "./Input.js";

const base = 10;

const state = new State("1488");
const input = new Input({
  onChange: state.update,
  config: { name: "name", value: state.value, type: "number" },
});
const text = createElement("h1", { class: "text" }, [
  (+state.value).toString(base),
]);

const update = createComposite(input.updateValue).add(
  (value) => (text.innerText = (+value).toString(base))
);

state.addHandler(update);

const root = document.getElementById("root")!;
root.appendChild(input.element);
root.appendChild(text);
