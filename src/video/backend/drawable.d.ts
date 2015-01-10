/// <reference path="../../nifty.d.ts" />
/// <reference path="../../system/point.d.ts" />
/// <reference path="../../system/rect.d.ts" />
/// <reference path="../color.d.ts" />
declare module Nifty {
    class Drawable {
        position: Point;
        origin: Point;
        scale: Point;
        rotation: number;
        color: Color;
        private array;
        protected addVertex(coord: Point, color: Color, uv?: Point): void;
        protected clearVertices(): void;
        draw(mode?: number): void;
    }
}
