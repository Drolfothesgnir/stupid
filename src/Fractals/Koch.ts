import Point from "../utilities/Point.js";

const { cos, sin, PI: pi } = Math;

export default function snowFlake(points: Point[]) {
  const result = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const distance = a.distance(b);
    const d3 = distance / 3;
    const angle = a.angle(b);
    const c = new Point(d3 * cos(angle) + a.x, d3 * sin(angle) + a.y);
    const d = new Point(
      d3 * cos(angle - pi / 3) + c.x,
      d3 * sin(angle - pi / 3) + c.y
    );
    const e = new Point(
      d3 * cos(angle + pi / 3) + d.x,
      d3 * sin(angle + pi / 3) + d.y
    );
    result.push(a, c, d, e);
  }
  result.push(points[points.length - 1]);
  return result;
}

export function quadratic(points: Point[]) {
  const result = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const dist = a.distance(b) / 3;
    const angle = a.angle(b);
    const c = new Point(
      dist * cos(angle) + a.x,
      dist * sin(angle) + a.y
    );
    const d = new Point(
      dist * cos(angle - pi / 2) + c.x,
      dist * sin(angle - pi / 2) + c.y
    );
    const e = new Point(
      dist * cos(angle) + d.x,
      dist * sin(angle) + d.y
    );
    const f = new Point(
      dist * cos(angle + pi / 2) + e.x,
      dist * sin(angle + pi / 2) + e.y
    );
    result.push(a, c, d, e, f);
  }

  result.push(points[points.length - 1]);
  return result;
}