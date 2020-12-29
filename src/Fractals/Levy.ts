import Point from "../utilities/Point.js";

export default function transform(points: Point[]) {
  const result = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const distance = a.distance(b);
    const angle = a.angle(b);
    const r = Math.SQRT1_2 * distance;
    const c = new Point(
      r * Math.cos(angle - Math.PI / 4) + a.x,
      r * Math.sin(angle - Math.PI / 4) + a.y
    );
    result.push(a, c);
  }
  result.push(points[points.length - 1]);
  return result;
}