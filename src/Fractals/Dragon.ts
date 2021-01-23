import Point from "../utilities/Point.js";

export default function D(points: Point[]) {
  const result = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const r = a.distance(b) * Math.SQRT1_2;
    const angle = a.angle(b);
    const x = i & 1 ? -1 : 1;
    const c = new Point(
      r * Math.cos(angle + x * (Math.PI / 4)) + a.x,
      r * Math.sin(angle + x * (Math.PI / 4)) + a.y
    );
    result.push(a, c);
  }

  result.push(points[points.length - 1]);
  return result;
}