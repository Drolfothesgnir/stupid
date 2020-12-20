import { randomInt } from "./random.js";

function parseHex(hex: string) {
  if (/^#[0-9a-f]{6}$/i.test(hex)) {
    const red = parseInt(hex[1] + hex[2], 16);
    const green = parseInt(hex[3] + hex[4], 16);
    const blue = parseInt(hex[5] + hex[6], 16);
    return new Color(red, green, blue);
  }
}

export default class Color {
  private value: [number, number, number, number] = [0, 0, 0, 1];
  constructor(red: number, green: number, blue: number, alpha: number = 1) {
    this[0] = red;
    this[1] = green;
    this[2] = blue;
    this.alpha = alpha;
  }

  static random() {
    return new Color(randomInt(0, 256), randomInt(0, 256), randomInt(0, 256));
  }

  static parseHex = parseHex;

  get 0() {
    return this.value[0];
  }

  set 0(x: number) {
    if (x >= 0 && x <= 255) {
      this.value[0] = x;
    }
  }

  get 1() {
    return this.value[1];
  }

  set 1(x: number) {
    if (x >= 0 && x <= 255) {
      this.value[1] = x;
    }
  }

  get 2() {
    return this.value[2];
  }

  set 2(x: number) {
    if (x >= 0 && x <= 255) {
      this.value[2] = x;
    }
  }

  get alpha() {
    return this.value[3];
  }

  set alpha(x: number) {
    if (x >= 0 && x <= 1) {
      this.value[3] = x;
    }
  }

  get red() {
    return this.value[0];
  }

  set red(x) {
    this[0] = x;
  }

  get green() {
    return this.value[1];
  }

  set green(x) {
    this[1] = x;
  }

  get blue() {
    return this.value[2];
  }

  set blue(x) {
    this[2] = x;
  }

  toHexString() {
    let result = "#";
    for (let i = 0; i < 3; i++) {
      result += this.value[i].toString(16).padStart(2, "0");
    }
    return result;
  }

  toHexAString() {
    return (
      this.toHexString() +
      Math.floor(this.alpha * 255)
        .toString(16)
        .padStart(2, "0")
    );
  }

  toRGBString() {
    return `rgb(${this[0]}, ${this[1]}, ${this[2]})`;
  }

  toRGBAString() {
    return `rgba(${this[0]}, ${this[1]}, ${this[2]}, ${this.alpha})`;
  }

  get raw() {
    return [this[0], this[1], this[2], this.alpha];
  }
}

Color.prototype.toString = Color.prototype.toHexString;
