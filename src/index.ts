import List from "./List.js";
import createElement from "./utilities/createElement.js";
import GS from "./State/GlobalState.js";
import createColoredButton from "./ColoredButton.js";

const label = document.getElementById("label")! as HTMLInputElement;
const submit = document.getElementById("submit")!;
const listElement = document.getElementById("listElement")!;
const renderButton = document.getElementById("render")!;

type Color = [number, number, number];
GS.create<Color>("color", [255, 255, 255]);

const rgb = GS.getValue<Color>("color") || [255, 255, 255];

const [red, green, blue] = [0, 1, 2].map((i) => {
  return createElement(
    "input",
    {
      type: "range",
      min: "0",
      max: "255",
      value: rgb[i].toString(),
    },
    undefined,
    {
      oninput(e: InputEvent) {
        GS.update<Color>("color", (oldValue) => {
          oldValue[i] = +(e.target as HTMLInputElement).value;
          return oldValue;
        });
      },
    }
  );
});

listElement.appendChild(red);
listElement.appendChild(green);
listElement.appendChild(blue);

const first = createColoredButton(undefined, ["First"]);
const second = createColoredButton(undefined, ["Second"]);
label.insertAdjacentElement("beforebegin", first);
listElement.insertAdjacentElement("afterend", second);
