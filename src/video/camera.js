/*
 *  camera.ts
 *  Nifty HTML5 Game Engine
 *  State Camera
 */
/// <reference path="../system/point.ts" />
/// <reference path="../system/rect.ts" />
/// <reference path="../system/util.ts" />
/// <reference path="backend/view.ts" />
var Nifty;
(function (Nifty) {
    var Camera = (function () {
        function Camera(value) {
            this.position = new Nifty.Point();
            this.smooth = false;
            this.smoothness = 0.33;
            this.roundPosition = true;
            // Internal use
            this._actualPosition = new Nifty.Point();
            this.view = null;
            this.originalSize = new Nifty.Point();
            this.view = value;
            this.position = value.size.divide(2, 2);
            this.originalSize = value.size;
            this._actualPosition = this.position;
        }
        Camera.prototype.update = function () {
            if (this.smooth) {
                var dir = Nifty.Util.direction(this._actualPosition, this.position);
                var len = Nifty.Util.distance(this._actualPosition, this.position);
                this._actualPosition.add(Nifty.Util.lengthDir(dir, len * this.smoothness));
            }
            else
                this._actualPosition = this.position;
        };
        Camera.prototype.apply = function () {
            var center = this._actualPosition;
            if (this.roundPosition) {
                var pxSize = 1.0 * this.getZoom();
                center.x = Nifty.Util.roundToNearest(this._actualPosition.x, pxSize);
                center.y = Nifty.Util.roundToNearest(this._actualPosition.y, pxSize);
            }
            var offset = 0.25 * this.getZoom();
            center.x += offset;
            center.y += offset;
            var v = Nifty.getView();
            v.center = center;
            Nifty.setView(v);
        };
        Camera.prototype.setZoom = function (value) {
            this.view.size = this.originalSize;
            this.view.zoom(value);
        };
        Camera.prototype.getZoom = function () {
            return this.view.size.x / this.originalSize.x;
        };
        Camera.prototype.getBounds = function () {
            return new Nifty.Rect(this.view.center.x - this.view.size.x / 2, this.view.center.y - this.view.size.y / 2, this.view.size.x, this.view.size.y);
        };
        return Camera;
    })();
    Nifty.Camera = Camera;
})(Nifty || (Nifty = {}));
