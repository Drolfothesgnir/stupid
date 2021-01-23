import Point from "./Point.js";

const { cos, sin } = Math;

export default function linearTransform(
  points: Point[],
  d: number[],
  x: number[]
) {
  const result = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const distance = a.distance(b);
    const angle = a.angle(b);
    result.push(a);
    for (let i = 0; i < d.length; i++) {
      result.push(
        new Point(
          d[i] * distance * cos(angle + x[i]) + a.x,
          d[i] * distance * sin(angle + x[i]) + a.y
        )
      );
    }
  }
  result.push(points[points.length - 1]);
  return result;
}
