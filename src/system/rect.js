/*
 *  rect.js
 *  Nifty System
 *  Rectangle
 */
var Nifty;
(function (Nifty) {
    var Rect = (function () {
        function Rect(xc, ys, width, height) {
            if (typeof xc === 'number') {
                this.x = xc || 0;
                this.y = ys || 0;
                this.width = width || 0;
                this.height = height || 0;
            }
            else if (xc instanceof Nifty.Point) {
                this.x = xc != undefined ? xc.x : 0;
                this.y = xc != undefined ? xc.y : 0;
                this.width = ys != undefined ? ys.x : 0;
                this.height = ys != undefined ? ys.y : 0;
            }
            else
                throw 'Arguments did not match either accepted signature.';
        }
        Rect.prototype.translate = function (xp, y) {
            if (typeof xp === 'number')
                return new Rect(this.x + xp, this.y + y, this.width, this.height);
            else if (xp instanceof Nifty.Point)
                return new Rect(this.x + xp.x, this.y + xp.y, this.width, this.height);
            throw 'Arguments did not match either accepted signature.';
        };
        Rect.prototype.contains = function (xp, y) {
            var minX = Math.min(this.x, this.x + this.width);
            var minY = Math.min(this.y, this.y + this.height);
            var maxX = Math.max(this.x, this.x + this.width);
            var maxY = Math.max(this.y, this.y + this.height);
            if (typeof xp === 'number') {
                return xp >= minX && xp <= maxX && y >= minY && y <= maxY;
            }
            else if (xp instanceof Nifty.Point) {
                return xp.x >= minX && xp.x <= maxX && xp.y >= minY && xp.y <= maxY;
            }
            throw 'Arguments did not match either accepted signature.';
        };
        Rect.prototype.intersects = function (rect) {
            var aMinX = Math.min(this.x, this.x + this.width);
            var aMinY = Math.min(this.y, this.y + this.height);
            var aMaxX = Math.max(this.x, this.x + this.width);
            var aMaxY = Math.max(this.y, this.y + this.height);
            var bMinX = Math.min(rect.x, rect.x + rect.width);
            var bMinY = Math.min(rect.y, rect.y + rect.height);
            var bMaxX = Math.max(rect.x, rect.x + rect.width);
            var bMaxY = Math.max(rect.y, rect.y + rect.height);
            return Math.max(aMinX, bMinX) < Math.min(aMaxX, bMaxX) && Math.max(aMinY, bMinY) < Math.min(aMaxY, bMaxY);
        };
        Rect.prototype.coords = function () {
            return new Nifty.Point(this.x, this.y);
        };
        Rect.prototype.size = function () {
            return new Nifty.Point(this.width, this.height);
        };
        Rect.prototype.toArray = function () {
            return [this.x, this.y, this.width, this.height];
        };
        Rect.prototype.clone = function () {
            return new Rect(this.x, this.y, this.width, this.height);
        };
        return Rect;
    })();
    Nifty.Rect = Rect;
})(Nifty || (Nifty = {}));
