/*
 *  point.ts
 *  Nifty System
 *  Point
 */
var Nifty;
(function (Nifty) {
    var Point = (function () {
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Point.prototype.add = function (xp, y) {
            if (typeof xp === 'number')
                return new Point(this.x + xp, this.y + y);
            else if (xp instanceof Point)
                return new Point(this.x + xp.x, this.y + xp.y);
            throw 'Arguments did not match either accepted signature.';
        };
        Point.prototype.sub = function (xp, y) {
            if (typeof xp === 'number')
                return new Point(this.x - xp, this.y - y);
            else if (xp instanceof Point)
                return new Point(this.x - xp.x, this.y - xp.y);
            throw 'Arguments did not match either accepted signature.';
        };
        Point.prototype.multiply = function (xp, y) {
            if (typeof xp === 'number')
                return new Point(this.x * xp, this.y * y);
            else if (xp instanceof Point)
                return new Point(this.x * xp.x, this.y * xp.y);
            throw 'Arguments did not match either accepted signature.';
        };
        Point.prototype.divide = function (xp, y) {
            if (typeof xp === 'number')
                return new Point(this.x / xp, this.y / y);
            else if (xp instanceof Point)
                return new Point(this.x / xp.x, this.y / xp.y);
            throw 'Arguments did not match either accepted signature.';
        };
        Point.prototype.equals = function (xp, y) {
            if (typeof xp === 'number')
                return this.x == xp && this.y == y;
            else if (xp instanceof Point)
                return this.x == xp.x && this.y == xp.y;
            throw 'Arguments did not match either accepted signature.';
        };
        Point.prototype.floor = function () {
            return new Point(Math.floor(this.x), Math.floor(this.y));
        };
        Point.prototype.ceil = function () {
            return new Point(Math.ceil(this.x), Math.ceil(this.y));
        };
        Point.prototype.round = function () {
            return new Point(Math.round(this.x), Math.round(this.y));
        };
        Point.prototype.rotate = function (origin, theta) {
            return new Point(Math.cos(theta) * (this.x - origin.x) - Math.sin(theta) * (this.y - origin.y) + origin.x, Math.sin(theta) * (this.x - origin.x) + Math.cos(theta) * (this.y - origin.y) + origin.y);
        };
        Point.prototype.toArray = function () {
            return [this.x, this.y];
        };
        Point.prototype.clone = function () {
            return new Point(this.x, this.y);
        };
        return Point;
    })();
    Nifty.Point = Point;
})(Nifty || (Nifty = {}));
