/*
 *  drawable.ts
 *  Nifty HTML5 Game Engine
 *  Drawable object
 */

/// <reference path="../../nifty.ts" />
/// <reference path="../../system/point.ts" />
/// <reference path="../../system/rect.ts" />
/// <reference path="../color.ts" />

module Nifty {
    export class Drawable {
        public position: Point = new Point();
        public origin: Point = new Point();
        public scale: Point = new Point(1, 1);
        public rotation: number = 0;
        public color: Color = Colors.white.clone();

        private array: number[] = [];
        
        protected addVertex(coord: Point, color: Color, uv: Point = new Point(-1, -1)) {
            var glColor = color.getGlColor();
            this.array = this.array.concat([
                coord.x, coord.y, glColor.r, glColor.g, glColor.b, glColor.a, uv.x, uv.y
            ]);
        }
    
        protected clearVertices(): void {
            while(this.array.length)
                this.array.pop();
        }

        public draw(mode: number = gl.TRIANGLES): void {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.array), gl.STATIC_DRAW);
            gl.drawArrays(gl.TRIANGLES, 0, this.array.length / 8);
        }
    }
}
