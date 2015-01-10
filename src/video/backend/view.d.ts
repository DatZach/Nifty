/// <reference path="../../system/point.d.ts" />
/// <reference path="../../system/rect.d.ts" />
declare module Nifty {
    class View {
        center: Point;
        size: Point;
        rotation: number;
        constructor();
        constructor(rect: Rect);
        constructor(center: Point, size: Point);
        move(point: Point): void;
        move(x: number, y: number): void;
        zoom(factor: number): void;
        getViewport(): Rect;
        clone(): View;
    }
}
