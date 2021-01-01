import transformKoch from "./Fractals/Koch.js";
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

const p = polygon(400, 300, 10, 200);

let points = [p];

drawShapes(ctx, points, true);
const center = computeCenter(p);
ctx.lineTo(center.x, center.y);
// ctx.lineTo(p[3].x, p[3].y);
ctx.stroke();
