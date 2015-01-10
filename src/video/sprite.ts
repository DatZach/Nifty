/*
 *  sprite.ts
 *  Nifty Video Subsystem
 *  WebGL Sprite
 */

/// <reference path="../nifty.ts" />
/// <reference path="../system/point.ts" />
/// <reference path="../system/rect.ts" />
/// <reference path="../asset-manager.ts" />
/// <reference path="backend/drawable.ts" />
/// <reference path="color.ts" />

module Nifty {
    export class Sprite extends Drawable {
        public image: HTMLImageElement;

        private size: Point = null;
        private textureId: WebGLTexture = null;

        constructor(texture: string);
        constructor(texture: HTMLImageElement);
        constructor(texture: any) {
            super();
            
            if (texture instanceof HTMLImageElement)
                this.image = texture;
            else if (typeof texture === 'string')
                this.image = Assets.getTexture(texture);

            this.size = new Point(this.image.width, this.image.height);
            this.createTexture();
        }

        public draw(): void {
            // Bind our texture
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.textureId);

            // Draw the rectangle
            var x = this.position.x - this.origin.x * this.scale.x,
                y = this.position.y - this.origin.y * this.scale.y,
                w = Math.floor(this.size.x * this.scale.x),
                h = Math.floor(this.size.y * this.scale.y);
            var x1 = x,
                x2 = x + w,
                y1 = y,
                y2 = y + h;
            
            this.clearVertices();
                this.addVertex(new Point(x1, y1).rotate(this.position, this.rotation), this.color, new Point(0, 0));
                this.addVertex(new Point(x2, y1).rotate(this.position, this.rotation), this.color, new Point(1, 0));
                this.addVertex(new Point(x1, y2).rotate(this.position, this.rotation), this.color, new Point(0, 1));
                this.addVertex(new Point(x1, y2).rotate(this.position, this.rotation), this.color, new Point(0, 1));
                this.addVertex(new Point(x2, y1).rotate(this.position, this.rotation), this.color, new Point(1, 0));
                this.addVertex(new Point(x2, y2).rotate(this.position, this.rotation), this.color, new Point(1, 1));
            super.draw();
        }
        
        private createTexture(): void {
            // Create texture
            this.textureId = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.textureId);

            // Set the parameters so we can render any size image
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            // TODO Generate mipmaps
            //gl.generateMipmap(gl.TEXTURE_2D);

            // Upload the image into the texture
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
            
            // Free binding so we don't accidently modify the buffer
            //gl.bindTexture(gl.TEXTURE_2D, null);
        }
    }
}
