/// <reference path="system/point.d.ts" />
/// <reference path="system/rect.d.ts" />
/// <reference path="input.d.ts" />
declare module Nifty {
    class Entity {
        parent: State;
        solid: boolean;
        depth: number;
        position: Point;
        origin: Point;
        size: Point;
        scale: Point;
        _gridCoordinate: Point;
        private _input;
        create(): void;
        destroy(): void;
        update(): void;
        draw(): void;
        input(): Input;
        getBoundingBox(): Rect;
    }
}
