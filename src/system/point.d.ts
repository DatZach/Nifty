declare module Nifty {
    class Point {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        add(x: number, y: number): Point;
        add(p: Point): Point;
        sub(x: number, y: number): Point;
        sub(p: Point): Point;
        multiply(x: number, y: number): Point;
        multiply(p: Point): Point;
        divide(x: number, y: number): Point;
        divide(p: Point): Point;
        equals(x: number, y: number): boolean;
        equals(p: Point): boolean;
        floor(): Point;
        ceil(): Point;
        round(): Point;
        rotate(origin: Point, theta: number): Point;
        toArray(): number[];
        clone(): Point;
    }
}
