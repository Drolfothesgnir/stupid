import Point from "../utilities/Point.js";

const { cos, sin, PI: pi } = Math;

export default function transform(points: Point[]) {
  const result = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const dist = a.distance(b) / 4;
    const angle = a.angle(b);
    const c = new Point(dist * cos(angle) + a.x, dist * sin(angle) + a.y);
    const d = new Point(
      dist * cos(angle + pi / 2) + c.x,
      dist * sin(angle + pi / 2) + c.y
    );
    const e = new Point(dist * cos(angle) + d.x, dist * sin(angle) + d.y);
    const f = new Point(
      dist * cos(angle - pi / 2) + e.x,
      dist * sin(angle - pi / 2) + e.y
    );
    const f1 = new Point(
      dist * cos(angle - pi / 2) + f.x,
      dist * sin(angle - pi / 2) + f.y
    );
    const g = new Point(dist * cos(angle) + f1.x, dist * sin(angle) + f1.y);
    const h = new Point(
      dist * cos(angle + pi / 2) + g.x,
      dist * sin(angle + pi / 2) + g.y
    );
    result.push(a, c, d, e, f, f1, g, h);
  }
  result.push(points[points.length - 1]);
  return result;
}
