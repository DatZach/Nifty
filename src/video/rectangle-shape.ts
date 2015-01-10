/*
 *  rectangle-shape.ts
 *  Nifty Video Subsystem
 *  WebGL Rectangle Shape
 */

/// <reference path="backend/drawable.ts" />

module Nifty {
    export class RectangleShape extends Drawable {
        public size: Point = new Point();

        public draw(): void {
            var x = this.position.x - this.origin.x * this.scale.x,
                y = this.position.y - this.origin.y * this.scale.y,
                w = Math.floor(this.size.x * this.scale.x),
                h = Math.floor(this.size.y * this.scale.y);
            var x1 = x,
                x2 = x + w,
                y1 = y,
                y2 = y + h;
            
            this.clearVertices();
                this.addVertex(new Point(x1, y1).rotate(this.position, this.rotation), this.color);
                this.addVertex(new Point(x2, y1).rotate(this.position, this.rotation), this.color);
                this.addVertex(new Point(x1, y2).rotate(this.position, this.rotation), this.color);
                this.addVertex(new Point(x1, y2).rotate(this.position, this.rotation), this.color);
                this.addVertex(new Point(x2, y1).rotate(this.position, this.rotation), this.color);
                this.addVertex(new Point(x2, y2).rotate(this.position, this.rotation), this.color);
            super.draw();
        }
    }
}
