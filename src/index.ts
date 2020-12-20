import Color from "./utilities/Color.js";
import createElement from "./utilities/createElement.js";

const color = createElement("input", { type: "color" }, undefined, {
  onchange(e: Event) {
    const { value } = e.target as HTMLInputElement;
    document.body.style.backgroundColor = value;
  },
});

document.getElementById("root")!.appendChild(color);
