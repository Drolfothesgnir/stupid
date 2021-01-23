import linearTransform from "../utilities/linearTransform.js";
import Point from "../utilities/Point.js";

const { PI: pi, SQRT2: sqrt2, sqrt, asin } = Math;

const d = [0.25, sqrt2 / 4, sqrt(5) / 4, 0.5, sqrt(5) / 4, sqrt(5 / 8), 0.75];
const x = [
  0,
  pi / 4,
  asin(1 / sqrt(5)),
  0,
  -asin(1 / sqrt(5)),
  -asin(0.25 / sqrt(5 / 8)),
  0,
];

export default function transform(points: Point[]) {
  return linearTransform(points, d, x);
}
