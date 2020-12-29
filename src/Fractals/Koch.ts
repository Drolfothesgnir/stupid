import Point from "../utilities/Point.js";

export default function transform(points: Point[]) {
  const result = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const distance = a.distance(b);
    const d3 = distance / 3;
    const angle = a.angle(b);
    const c = new Point(d3 * Math.cos(angle) + a.x, d3 * Math.sin(angle) + a.y);
    const d = new Point(
      d3 * Math.cos(angle - Math.PI / 3) + c.x,
      d3 * Math.sin(angle - Math.PI / 3) + c.y
    );
    const e = new Point(
      d3 * Math.cos(angle + Math.PI / 3) + d.x,
      d3 * Math.sin(angle + Math.PI / 3) + d.y
    );
    result.push(a, c, d, e);
  }
  result.push(points[points.length - 1]);
  return result;
}
