/*
 *  camera.ts
 *  Nifty HTML5 Game Engine
 *  State Camera
 */

/// <reference path="../system/point.ts" />
/// <reference path="../system/rect.ts" />
/// <reference path="../system/util.ts" />
/// <reference path="backend/view.ts" />

module Nifty {
    export class Camera {
        public position: Point = new Point();
        public smooth: boolean = false;
        public smoothness: number = 0.33;
        public roundPosition: boolean = true;
        
        // Internal use
        public _actualPosition: Point = new Point();
        
        private view: View = null;
        private originalSize: Point = new Point();
        
        constructor(value: View) {
            this.view = value;
            this.position = value.size.divide(2, 2);
            this.originalSize = value.size;
            this._actualPosition = this.position;
        }
        
        public update(): void {
            if (this.smooth) {
                var dir = Util.direction(this._actualPosition, this.position);
                var len = Util.distance(this._actualPosition, this.position);
                
                this._actualPosition.add(Util.lengthDir(dir, len * this.smoothness));
            }
            else
                this._actualPosition = this.position;
        }
        
        public apply(): void {
            var center = this._actualPosition;
            
            if (this.roundPosition) {
                var pxSize = 1.0 * this.getZoom();
                center.x = Util.roundToNearest(this._actualPosition.x, pxSize);
                center.y = Util.roundToNearest(this._actualPosition.y, pxSize);
            }
            
            var offset = 0.25 * this.getZoom();
            center.x += offset;
            center.y += offset;
            
            var v = getView();
            v.center = center;
            setView(v);
        }
        
        public setZoom(value: number): void {
            this.view.size = this.originalSize;
            this.view.zoom(value);
        }
        
        public getZoom(): number {
            return this.view.size.x / this.originalSize.x;
        }
        
        public getBounds(): Rect {
            return new Rect(
                this.view.center.x - this.view.size.x / 2,
                this.view.center.y - this.view.size.y / 2,
                this.view.size.x,
                this.view.size.y
            );
        }
    }
}
