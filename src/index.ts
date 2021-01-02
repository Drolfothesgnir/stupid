import transformKoch from "./Fractals/Koch.js";
import transform from "./Fractals/PythagoreanTree.js";
import createElement from "./utilities/createElement.js";
import { degToRad, radToDeg } from "./utilities/degreeConversion.js";
import draw from "./utilities/draw.js";
import Point, { IPoint2D } from "./utilities/Point.js";
import polygon, {
  computeRadius,
  computeCenter,
} from "./utilities/regularPolygon.js";

const root = document.getElementById("root")!;

const canvas = createElement("canvas", { width: "800", height: "600" });
const ctx = canvas.getContext("2d")!;
root.appendChild(canvas);

const sqrt5 = Math.sqrt(5);
const phi = (1 + sqrt5) / 2;

function drawShapes(
  ctx: CanvasRenderingContext2D,
  shapes: IPoint2D[][],
  close = false
) {
  for (let i = 0; i < shapes.length; i++) {
    draw(ctx, shapes[i], close);
  }
}

function transformShapes_i(
  shapes: Point[][],
  fn: (shapes: Point[][]) => Point[][],
  i: number
) {
  while (i > 0) {
    shapes = fn(shapes);
    i -= 1;
  }
  return shapes;
}

const p = polygon(400, 550, 4, 100, (-Math.PI * 3) / 4, false);

let points = [p];
points = transformShapes_i(points, transform, 12);
console.log(points.length);

drawShapes(ctx, points, true);
