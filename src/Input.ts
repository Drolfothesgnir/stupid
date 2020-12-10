import createElement from "./utilities/createElement.js";
import augmentElement, { Augmented } from "./utilities/augmentElement.js";

type InputConfig = {
  onChange?: (value: string) => void | null;
  config?: { [key: string]: string };
};

interface AugmentedInput extends Augmented {
  aug: {
    updateValue(value: string): void;
    [key: string]: any;
  };
}

export default function createInput(config: InputConfig = {}) {
  const element = createElement("input", config.config);
  if (typeof config.onChange === "function") {
    element.addEventListener("input", (e: Event) =>
      config.onChange!((e.target as HTMLInputElement)!.value)
    );
  }
  return augmentElement(element, {
    updateValue(value: string) {
      element.value = value;
    },
  }) as HTMLInputElement & AugmentedInput;
}
