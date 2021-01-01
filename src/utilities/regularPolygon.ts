import Point from "./Point.js";

const { cos, sin, PI: pi, sqrt } = Math;

export function computeRadius(sideLength: number, n: number) {
  const angle = ((n - 2) * pi) / (n * 2);
  return sideLength / (2 * cos(angle));
}

export function computeCenter(rPolygon: Point[]) {
  const n = rPolygon.length;
  const a = rPolygon[0];
  const b = rPolygon[1];
  const side = a.distance(b);
  const angle = a.angle(b);
  const m = a.midpoint(b);
  const radius = computeRadius(side, n);
  const r = sqrt(radius ** 2 - (side / 2) ** 2);
  return new Point(
    r * cos(angle + pi / 2) + m.x,
    r * sin(angle + pi / 2) + m.y
  );
}

export default function regularPolygon(
  x: number,
  y: number,
  sides: number,
  length: number,
  startAngle = 0,
  fromRadius = true
) {
  const angle = (2 * pi) / sides;
  const radius = fromRadius ? length : computeRadius(length, sides);
  const result = [];
  for (let i = 0; i < sides; i++) {
    result[i] = new Point(
      radius * cos(startAngle) + x,
      radius * sin(startAngle) + y
    );
    startAngle += angle;
  }
  return result;
}
