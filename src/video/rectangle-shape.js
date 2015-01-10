/*
 *  rectangle-shape.ts
 *  Nifty Video Subsystem
 *  WebGL Rectangle Shape
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="backend/drawable.ts" />
var Nifty;
(function (Nifty) {
    var RectangleShape = (function (_super) {
        __extends(RectangleShape, _super);
        function RectangleShape() {
            _super.apply(this, arguments);
            this.size = new Nifty.Point();
        }
        RectangleShape.prototype.draw = function () {
            var x = this.position.x - this.origin.x * this.scale.x, y = this.position.y - this.origin.y * this.scale.y, w = Math.floor(this.size.x * this.scale.x), h = Math.floor(this.size.y * this.scale.y);
            var x1 = x, x2 = x + w, y1 = y, y2 = y + h;
            this.clearVertices();
            this.addVertex(new Nifty.Point(x1, y1).rotate(this.position, this.rotation), this.color);
            this.addVertex(new Nifty.Point(x2, y1).rotate(this.position, this.rotation), this.color);
            this.addVertex(new Nifty.Point(x1, y2).rotate(this.position, this.rotation), this.color);
            this.addVertex(new Nifty.Point(x1, y2).rotate(this.position, this.rotation), this.color);
            this.addVertex(new Nifty.Point(x2, y1).rotate(this.position, this.rotation), this.color);
            this.addVertex(new Nifty.Point(x2, y2).rotate(this.position, this.rotation), this.color);
            _super.prototype.draw.call(this);
        };
        return RectangleShape;
    })(Nifty.Drawable);
    Nifty.RectangleShape = RectangleShape;
})(Nifty || (Nifty = {}));
