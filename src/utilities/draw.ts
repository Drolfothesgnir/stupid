import { IPoint2D } from "./Point.js";

export default function draw(
  ctx: CanvasRenderingContext2D,
  points: IPoint2D[],
  close = false
) {
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  if (close) {
    ctx.lineTo(points[0].x, points[0].y);
  }
  ctx.stroke();
}
