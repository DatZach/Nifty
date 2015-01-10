/// <reference path="backend/drawable.d.ts" />
declare module Nifty {
    class RectangleShape extends Drawable {
        size: Point;
        draw(): void;
    }
}
