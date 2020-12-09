import createElement from "./utilities/createElement.js";

type InputConfig = {
  onChange: (value: string) => void | null;
  config?: { [key: string]: string };
};

export default class Input {
  element: HTMLInputElement;
  constructor(config: InputConfig) {
    this.element = createElement("input", config.config);
    if (typeof config.onChange === "function") {
      this.element.addEventListener("input", (e: Event) =>
        config.onChange((e.target as HTMLInputElement)!.value)
      );
    }
  }

  updateValue = (value: string) => {
    this.element.value = value;
  };
}
