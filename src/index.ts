import createElement from "./utilities/createElement.js";
import draw, { drawShapes } from "./utilities/draw.js";
import Point from "./utilities/Point.js";
import regularPolygon from "./utilities/regularPolygon.js";
import M from "./Fractals/Minkowski.js";
import K, { quadratic as Q } from "./Fractals/Koch.js";
import L from "./Fractals/Levy.js";
import P from "./Fractals/PythagoreanTree.js";
import { randomInt } from "./utilities/random.js";
import { radToDeg } from "./utilities/degreeConversion.js";
import D from "./Fractals/Dragon.js";
import createComposite from "./utilities/createComposite.js";

const root = document.getElementById("root")!;

const w = innerWidth - 10;
const h = innerHeight - 10;

const canvas = createElement("canvas", {
  width: w.toString(),
  height: h.toString(),
});
const ctx = canvas.getContext("2d")!;
root.appendChild(canvas);

// const f = [M, L, K, Q, D];

// let points = regularPolygon(w * 0.5, h * 0.5, randomInt(3, 10), 350);
// points.push(points[0]);

// function transform(i: number) {
//   for (let j = 0; j < i; j++) {
//     if (randomInt()) {
//       points = points.reverse();
//     }
//     points = f[randomInt(0, f.length)](points);
//   }
// }

// transform(5);

// draw(ctx, points, true);
// console.log(points.length - 1);

let points = [new Point(w * 0.25, h * 0.5), new Point(w * 0.85, h * 0.5)];

points = M(points);
points = M(points);

draw(ctx, points);

function fill() {
  ctx.fill("evenodd");
}

function rerender() {
  location.reload();
}

function log() {
  alert(points.length - 1);
}

const keyMap: { [key: string]: () => void } = {
  f: fill,
  r: rerender,
  l: log,
};

document.addEventListener("keydown", (e) => keyMap[e.key]?.());
document.addEventListener("keyup", (e) => console.log(e.key));
