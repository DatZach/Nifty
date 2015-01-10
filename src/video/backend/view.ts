/*
 *  view.ts
 *  Nifty HTML5 Game Engine
 */

/// <reference path="../../system/point.ts" />
/// <reference path="../../system/rect.ts" />

module Nifty {
    export class View {
        public center: Point = new Point();
        public size: Point = new Point();
        public rotation: number = 0;
        
        constructor()
        constructor(rect: Rect)
        constructor(center: Point, size: Point)
        constructor(x?: any, size?: Point) {
            if (x instanceof Rect) {
                this.center.x = x.x + x.width / 2.0;
                this.center.y = x.y + x.height / 2.0;
                this.size.x = x.width;
                this.size.y = x.height;
            }
            else if (x instanceof Point) {
                this.center = x;
                this.size = size;
            }
            else if (x == undefined && size == undefined) {
                this.size.x = 800;
                this.size.y = 600;
            }
            else
                throw 'Arguments did not match either accepted signature.';
        }
        
        public move(point: Point): void
        public move(x: number, y: number): void
        public move(xp: any, y?: number): void {
            if (xp instanceof Point)
                this.center = this.center.add(xp);
            else
                this.center = this.center.add(xp, y);
        }
        
        public zoom(factor: number): void {
            this.size.multiply(factor, factor);
        }
        
        public getViewport(): Rect {
            return new Rect(
                this.center.x - this.size.x / 2.0,
                -(this.center.y - this.size.y / 2.0),
                this.size.x,
                this.size.y
            );
        }
        
        public clone(): View {
            return new View(this.getViewport());
        }
    }
}
