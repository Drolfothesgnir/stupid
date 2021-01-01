const { sqrt, atan2 } = Math;

export interface IPoint2D {
  x: number;
  y: number;
}

export default class Point implements IPoint2D {
  constructor(public x: number, public y: number) {}

  distance(point: IPoint2D) {
    return sqrt((this.x - point.x) ** 2 + (this.y - point.y) ** 2);
  }

  angle(point: IPoint2D) {
    return atan2(point.y - this.y, point.x - this.x);
  }

  midpoint(point: IPoint2D) {
    return this.segment(point, 0.5);
  }

  segment(point: IPoint2D, segmentSize: number) {
    const x = this.x + (point.x - this.x) * segmentSize;
    const y = this.y + (point.y - this.y) * segmentSize;
    return new Point(x, y);
  }
}
