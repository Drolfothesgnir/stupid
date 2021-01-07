import transform from "./Fractals/Minkowski.js";
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

// let points = [new Point(100, 300), new Point(700, 300)];
let points = polygon(400, 300, 4, 300);
points.push(points[0]);

points = transform(points);
points = transform(points);
points = transform(points);
// points = transform(points);
// points = transform(points);
// points = transform(points);

draw(ctx, points);
