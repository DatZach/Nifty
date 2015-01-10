/*
 *  rect.js
 *  Nifty System
 *  Rectangle
 */

module Nifty {
    export class Rect {
        public x: number;
        public y: number;
        public width: number;
        public height: number;

        constructor(coord?: Point, size?: Point);
        constructor(x?: number, y?: number, width?: number, height?: number);
        constructor(xc?: any, ys?: any, width?: number, height?: number) {
            if (typeof xc === 'number') {
                this.x = xc || 0;
                this.y = ys || 0;
                this.width = width || 0;
                this.height = height || 0;
            }
            else if (xc instanceof Point) {
                this.x = xc != undefined ? xc.x : 0;
                this.y = xc != undefined ? xc.y : 0;
                this.width = ys != undefined ? ys.x : 0;
                this.height = ys != undefined ? ys.y : 0;
            }
            else
                throw 'Arguments did not match either accepted signature.';
        }
        
        public translate(p: Point): Rect;
        public translate(x: number, y: number): Rect;
        public translate(xp: any, y?: number): Rect {
            if (typeof xp === 'number')
                return new Rect(this.x + xp, this.y + y, this.width, this.height);
            else if (xp instanceof Point)
                return new Rect(this.x + xp.x, this.y + xp.y, this.width, this.height);
            
            throw 'Arguments did not match either accepted signature.';
        }

        public contains(p: Point): boolean;
        public contains(x: number, y: number): boolean;
        public contains(xp: any, y?: number): boolean {
            var minX = Math.min(this.x, this.x + this.width);
            var minY = Math.min(this.y, this.y + this.height);
            var maxX = Math.max(this.x, this.x + this.width);
            var maxY = Math.max(this.y, this.y + this.height);

            if (typeof xp === 'number') {
                return xp >= minX && xp <= maxX &&
                       y >= minY && y <= maxY;
            }
            else if (xp instanceof Point) {
                return xp.x >= minX && xp.x <= maxX &&
                       xp.y >= minY && xp.y <= maxY;
            }
            
            throw 'Arguments did not match either accepted signature.';
        }

        public intersects(rect: Rect): boolean {
            var aMinX = Math.min(this.x, this.x + this.width);
            var aMinY = Math.min(this.y, this.y + this.height);
            var aMaxX = Math.max(this.x, this.x + this.width);
            var aMaxY = Math.max(this.y, this.y + this.height);

            var bMinX = Math.min(rect.x, rect.x + rect.width);
            var bMinY = Math.min(rect.y, rect.y + rect.height);
            var bMaxX = Math.max(rect.x, rect.x + rect.width);
            var bMaxY = Math.max(rect.y, rect.y + rect.height);

            return Math.max(aMinX, bMinX) < Math.min(aMaxX, bMaxX) &&
                   Math.max(aMinY, bMinY) < Math.min(aMaxY, bMaxY);
        }
        
        public coords(): Point {
            return new Point(this.x, this.y);
        }

        public size(): Point {
            return new Point(this.width, this.height);
        }
        
        public toArray(): number[] {
            return [ this.x, this.y, this.width, this.height ];
        }
        
        public clone(): Rect {
            return new Rect(this.x, this.y, this.width, this.height);
        }
    }
}
