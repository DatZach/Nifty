/*
 *  drawable.ts
 *  Nifty HTML5 Game Engine
 *  Drawable object
 */
/// <reference path="../../nifty.ts" />
/// <reference path="../../system/point.ts" />
/// <reference path="../../system/rect.ts" />
/// <reference path="../color.ts" />
var Nifty;
(function (Nifty) {
    var Drawable = (function () {
        function Drawable() {
            this.position = new Nifty.Point();
            this.origin = new Nifty.Point();
            this.scale = new Nifty.Point(1, 1);
            this.rotation = 0;
            this.color = Nifty.Colors.white.clone();
            this.array = [];
        }
        Drawable.prototype.addVertex = function (coord, color, uv) {
            if (uv === void 0) { uv = new Nifty.Point(-1, -1); }
            var glColor = color.getGlColor();
            this.array = this.array.concat([
                coord.x,
                coord.y,
                glColor.r,
                glColor.g,
                glColor.b,
                glColor.a,
                uv.x,
                uv.y
            ]);
        };
        Drawable.prototype.clearVertices = function () {
            while (this.array.length)
                this.array.pop();
        };
        Drawable.prototype.draw = function (mode) {
            if (mode === void 0) { mode = Nifty.gl.TRIANGLES; }
            Nifty.gl.bufferData(Nifty.gl.ARRAY_BUFFER, new Float32Array(this.array), Nifty.gl.STATIC_DRAW);
            Nifty.gl.drawArrays(Nifty.gl.TRIANGLES, 0, this.array.length / 8);
        };
        return Drawable;
    })();
    Nifty.Drawable = Drawable;
})(Nifty || (Nifty = {}));
