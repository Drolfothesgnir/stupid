import linearTransform from "../utilities/linearTransform.js";
import Point from "../utilities/Point.js";

const { PI: pi, sqrt, SQRT2: sqrt2, asin } = Math;

const d_snow = [1 / 3, 1 / sqrt(3), 2 / 3];
const x_snow = [0, -pi / 6, 0];

export default function snowFlake(points: Point[]) {
  return linearTransform(points, d_snow, x_snow);
}

const d_quad = [1 / 3, sqrt2 / 3, sqrt(5) / 3, 2 / 3];
const x_quad = [0, -pi / 4, -asin(1 / sqrt(5)), 0];

export function quadratic(points: Point[]) {
  return linearTransform(points, d_quad, x_quad);
}
