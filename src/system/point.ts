/*
 *  point.ts
 *  Nifty System
 *  Point
 */

module Nifty {
    export class Point {
        constructor(public x: number = 0,
                    public y: number = 0) {
            
        }

        // Add +
        public add(x: number, y: number): Point;
        public add(p: Point): Point;
        public add(xp: any, y?: number): Point {
            if (typeof xp === 'number')
                return new Point(this.x + xp, this.y + y);
            else if (xp instanceof Point)
                return new Point(this.x + xp.x, this.y + xp.y);
            
            throw 'Arguments did not match either accepted signature.';
        }

        // Subtract -
        public sub(x: number, y: number): Point;
        public sub(p: Point): Point;
        public sub(xp: any, y?: number): Point {
            if (typeof xp === 'number')
                return new Point(this.x - xp, this.y - y);
            else if (xp instanceof Point)
                return new Point(this.x - xp.x, this.y - xp.y);
            
            throw 'Arguments did not match either accepted signature.';
        }

        // Multiplication *
        public multiply(x: number, y: number): Point;
        public multiply(p: Point): Point;
        public multiply(xp: any, y?: number): Point {
            if (typeof xp === 'number')
                return new Point(this.x * xp, this.y * y);
            else if (xp instanceof Point)
                return new Point(this.x * xp.x, this.y * xp.y);
            
            throw 'Arguments did not match either accepted signature.';
        }

        // Division /
        public divide(x: number, y: number): Point;
        public divide(p: Point): Point;
        public divide(xp: any, y?: number): Point {
            if (typeof xp === 'number')
                return new Point(this.x / xp, this.y / y);
            else if (xp instanceof Point)
                return new Point(this.x / xp.x, this.y / xp.y);

            throw 'Arguments did not match either accepted signature.';
        }
        
        public equals(x: number, y: number): boolean;
        public equals(p: Point): boolean;
        public equals(xp: any, y?: number): boolean {
            if (typeof xp === 'number')
                return this.x == xp && this.y == y;
            else if (xp instanceof Point)
                return this.x == xp.x && this.y == xp.y;
            
            throw 'Arguments did not match either accepted signature.';
        }
        
        public floor(): Point {
            return new Point(
                Math.floor(this.x),
                Math.floor(this.y)
            );
        }
        
        public ceil(): Point {
            return new Point(
                Math.ceil(this.x),
                Math.ceil(this.y)
            );
        }
        
        public round(): Point {
            return new Point(
                Math.round(this.x),
                Math.round(this.y)
            );
        }
        
        public rotate(origin: Point, theta: number): Point {
            return new Point(
                Math.cos(theta) * (this.x - origin.x) - Math.sin(theta) * (this.y - origin.y) + origin.x,
                Math.sin(theta) * (this.x - origin.x) + Math.cos(theta) * (this.y - origin.y) + origin.y
            );
        }
        
        public toArray(): number[] {
            return [ this.x, this.y ];
        }
        
        public clone(): Point {
            return new Point(this.x, this.y);
        }
    }
}
