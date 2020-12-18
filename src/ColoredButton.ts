import { addHandlerToState } from "./State/GlobalState.js";
import createElement from "./utilities/createElement.js";

type Color = [number, number, number];

export default function createColoredButton(
  config?: { [key: string]: string | boolean },
  chidlren?: (string | Node)[]
) {
  const button = createElement("button", config, chidlren);

  const handler = (color: Color) =>
    (button.style.backgroundColor =
      "#" + color.map((val) => val.toString(16).padStart(2, "0")).join(""));
  addHandlerToState("color", handler);

  return button;
}
