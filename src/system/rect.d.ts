declare module Nifty {
    class Rect {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(coord?: Point, size?: Point);
        constructor(x?: number, y?: number, width?: number, height?: number);
        translate(p: Point): Rect;
        translate(x: number, y: number): Rect;
        contains(p: Point): boolean;
        contains(x: number, y: number): boolean;
        intersects(rect: Rect): boolean;
        coords(): Point;
        size(): Point;
        toArray(): number[];
        clone(): Rect;
    }
}
