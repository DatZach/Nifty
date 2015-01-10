/*
 *  circle-shape.ts
 *  Nifty HTML5 Game Engine
 *  Circle Shape
 */

/// <reference path="backend/drawable.ts" />

module Nifty {
    export class CircleShape extends Drawable {
        constructor(public radius: number,
                    public pointCount: number = 32) {
            super();            
        }
        
        public draw(): void {
            this.clearVertices();

            var centerX = this.position.x - this.origin.x * this.scale.x + this.radius,
                centerY = this.position.y - this.origin.y * this.scale.y + this.radius;
            
            for(var i = 0; i < this.pointCount; ++i) {
                this.addVertex(this.coordForIndex(i).add(centerX, centerY).rotate(this.position, this.rotation), this.color);
                this.addVertex(this.coordForIndex(i + 1).add(centerX, centerY).rotate(this.position, this.rotation), this.color);
                this.addVertex(new Point(centerX, centerY).rotate(this.position, this.rotation), this.color);
            }
            
            super.draw();
        }
        
        private coordForIndex(i: number): Point {
            var angle = i * 2.0 * Math.PI / this.pointCount - Math.PI / 2.0;
            return new Point(Math.cos(angle) * this.radius,
                             Math.sin(angle) * this.radius);
        }
    }
}
