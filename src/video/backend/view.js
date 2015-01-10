/*
 *  view.ts
 *  Nifty HTML5 Game Engine
 */
/// <reference path="../../system/point.ts" />
/// <reference path="../../system/rect.ts" />
var Nifty;
(function (Nifty) {
    var View = (function () {
        function View(x, size) {
            this.center = new Nifty.Point();
            this.size = new Nifty.Point();
            this.rotation = 0;
            if (x instanceof Nifty.Rect) {
                this.center.x = x.x + x.width / 2.0;
                this.center.y = x.y + x.height / 2.0;
                this.size.x = x.width;
                this.size.y = x.height;
            }
            else if (x instanceof Nifty.Point) {
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
        View.prototype.move = function (xp, y) {
            if (xp instanceof Nifty.Point)
                this.center = this.center.add(xp);
            else
                this.center = this.center.add(xp, y);
        };
        View.prototype.zoom = function (factor) {
            this.size.multiply(factor, factor);
        };
        View.prototype.getViewport = function () {
            return new Nifty.Rect(this.center.x - this.size.x / 2.0, -(this.center.y - this.size.y / 2.0), this.size.x, this.size.y);
        };
        View.prototype.clone = function () {
            return new View(this.getViewport());
        };
        return View;
    })();
    Nifty.View = View;
})(Nifty || (Nifty = {}));
