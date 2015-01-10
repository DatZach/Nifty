/*
 *  text.ts
 *  Nifty HTML5 Game Engine
 *  WebGL Text
 */

/// <reference path="../nifty.ts" />
/// <reference path="../system/point.ts" />
/// <reference path="backend/drawable.ts" />

module Nifty {
    export class Text extends Drawable {
        
        // TODO Needs drop-shadow, outline, styles (bold, italic, etc)
        
        private text: string;
        private font: string;
        
        private size: Point = null;
        private image: HTMLImageElement;
        private textureId: WebGLTexture = null;
        
        constructor(text: string, font: string, color: Color = Colors.white) {
            super();
            
            this.text = text;
            this.font = font;
            this.color = color;
            
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
        
        public setText(text: string): void {
            this.text = text;
            this.createTexture()
        }
        
        public getText(): string {
            return this.text;
        }
        
        public setFont(font: string): void {
            this.font = font;
            this.createTexture();
        }
        
        public getFont(): string {
            return this.font;
        }
        
        public getBounds(): Rect {
            var fontSize: string[] = /^\d+?(?=(pt|px))/.exec(this.font.toLowerCase());
            var size: number = +fontSize[0] + (fontSize[1] === 'pt' ? +fontSize[0] * 1.33 : 0);
    
            // Calculate canvas size required to render entire text
            Nifty.backBuffer.font = this.font;
            return new Rect(
                0,
                0,
                Nifty.backBuffer.measureText(this.text).width,
                size / 2
            );
        }
        
        private createTexture(): void {
            var fontSize: string[] = /^\d+?(?=(pt|px))/.exec(this.font.toLowerCase());
            var size: number = +fontSize[0] + (fontSize[1] === 'pt' ? +fontSize[0] * 1.33 : 0);
    
            // Calculate canvas size required to render entire text
            Nifty.backBuffer.font = this.font;
            var width  = this.clampToValidSize(Nifty.backBuffer.measureText(this.text).width),
                height = this.clampToValidSize(size / 2);
            
            // Drawable needs the size of the buffer to work properly
            this.size = new Point(width, height);
            
            // Render to back buffer
            Nifty.backBufferCanvas.width = width;
            Nifty.backBufferCanvas.height = height;
            Nifty.backBuffer.fillStyle = this.color.getCssColor();
            Nifty.backBuffer.font = this.font;               // Reset font because changing the width/height resets the canvas
            Nifty.backBuffer.textBaseline = 'hanging';
            Nifty.backBuffer.fillText(this.text, 0, 0);
            
            // Create texture
            this.textureId = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.textureId);

            // Render back buffer to texture
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, Nifty.backBufferCanvas);
            
            // Set the parameters so we can render any size image
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            gl.generateMipmap(gl.TEXTURE_2D);
            
            // Free binding so we don't accidently modify the buffer
            //gl.bindTexture(gl.TEXTURE_2D, null);
        }
        
        private clampToValidSize(value: number): number {
            var pow = 1;
            while(pow < value)
                pow <<= 1;
            
            return pow;
        }
    }
}
