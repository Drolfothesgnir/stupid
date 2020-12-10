import createElement from "./utilities/createElement.js";
import augmentElement from "./utilities/augmentElement.js";

type InputConfig = {
  onChange: (value: string) => void | null;
  config?: { [key: string]: string };
};

export default function createInput(config: InputConfig) {
  const element = createElement("input", config.config);
  if (typeof config.onChange === "function") {
    element.addEventListener("input", (e: Event) =>
      config.onChange((e.target as HTMLInputElement)!.value)
    );
  }
  return augmentElement(element, {
    updateValue(value: string) {
      element.value = value;
    },
  });
}
