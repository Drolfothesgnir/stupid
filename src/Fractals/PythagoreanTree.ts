import Point from "../utilities/Point.js";
import regularPolygon from "../utilities/regularPolygon.js";

const { cos, sin, PI: pi, SQRT1_2: sr1_2} = Math;

export default function transform(squares: Point[][]) {
  const n = squares.length;
  let i = (n + 1) / 2;
  const square1 = squares[n - i];
  const dist = square1[0].distance(square1[1]);
  const dist1_2 = dist / 2;
  while (i) {
    const square = squares[n - i];
    const a = square[0];
    const b = square[1];
    const angle = a.angle(b);
    const lx = dist1_2 * cos(angle - pi / 2);
    const ly = dist1_2 * sin(angle - pi / 2);

    const x1 = lx + a.x;
    const y1 = ly + a.y;
    const sq1 = regularPolygon(x1, y1, 4, dist * sr1_2, angle + pi, false);
    const x2 = lx + b.x;
    const y2 = ly + b.y;
    const sq2 = regularPolygon(
      x2,
      y2,
      4,
      dist * sr1_2,
      angle - pi / 2,
      false
    );
    squares.push(sq1, sq2);
    i -= 1;
  }
  return squares;
}