import linearTransform from "../utilities/linearTransform.js";
import Point from "../utilities/Point.js";

const { PI: pi, SQRT1_2: sqrt1_2 } = Math;

const d = [sqrt1_2];
const x = [-pi / 4];

export default function transform(points: Point[]) {
  return linearTransform(points, d, x);
}
