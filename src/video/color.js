/*
 *  color.ts
 *  Nifty Video Subsystem
 *  Common RGBA Color
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Nifty;
(function (Nifty) {
    var Color = (function () {
        function Color() {
        }
        Color.prototype.getGlColor = function () {
            return {
                r: 0.0,
                g: 0.0,
                b: 0.0,
                a: 0.0
            };
        };
        Color.prototype.getCssColor = function () {
            return '';
        };
        return Color;
    })();
    Nifty.Color = Color;
    var RgbColor = (function (_super) {
        __extends(RgbColor, _super);
        function RgbColor(r, g, b, a) {
            if (a === void 0) { a = 255; }
            _super.call(this);
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        RgbColor.prototype.getGlColor = function () {
            return {
                r: this.r / 255.0,
                g: this.g / 255.0,
                b: this.b / 255.0,
                a: this.a / 255.0
            };
        };
        RgbColor.prototype.getCssColor = function () {
            return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a / 255.0 + ')';
        };
        RgbColor.prototype.clone = function () {
            return new RgbColor(this.r, this.g, this.b, this.a);
        };
        return RgbColor;
    })(Color);
    Nifty.RgbColor = RgbColor;
    var HsvColor = (function (_super) {
        __extends(HsvColor, _super);
        function HsvColor(h, s, v, a) {
            if (a === void 0) { a = 255; }
            _super.call(this);
            this.h = h;
            this.s = s;
            this.v = v;
            this.a = a;
        }
        HsvColor.prototype.getGlColor = function () {
            var h = this.h / 360.0 * 6, s = this.s / 100.0, v = this.v / 100.0;
            var i = Math.floor(h), f = h - i, p = v * (1.0 - s), q = v * (1.0 - f * s), t = v * (1.0 - (1.0 - f) * s), mod = i % 6;
            return {
                r: [v, q, p, p, t, v][mod],
                g: [t, v, v, q, p, p][mod],
                b: [p, p, t, v, v, q][mod],
                a: this.a / 255.0
            };
        };
        HsvColor.prototype.getCssColor = function () {
            return 'hsla(' + this.h + ', ' + +this.s + '%, ' + +this.v + '%, ' + +this.a / 255.0 + ')';
        };
        HsvColor.prototype.clone = function () {
            return new HsvColor(this.h, this.s, this.v, this.a);
        };
        return HsvColor;
    })(Color);
    Nifty.HsvColor = HsvColor;
    var Colors = (function () {
        function Colors() {
            // Work around TypeScript being fucking retarded
            // TODO Fix this hack
        }
        Colors.white = new RgbColor(255, 255, 255);
        Colors.black = new RgbColor(0, 0, 0);
        Colors.red = new RgbColor(255, 0, 0);
        Colors.green = new RgbColor(0, 255, 0);
        Colors.blue = new RgbColor(0, 0, 255);
        Colors.yellow = new RgbColor(255, 255, 0);
        Colors.magenta = new RgbColor(255, 0, 255);
        Colors.cyan = new RgbColor(0, 255, 255);
        Colors.transparent = new RgbColor(0, 0, 0, 0);
        Colors.cornflowerBlue = new RgbColor(100, 149, 237);
        Colors.peach = new RgbColor(255, 218, 185);
        Colors.snow = new RgbColor(255, 250, 250);
        Colors.ghostWhite = new RgbColor(248, 248, 255);
        Colors.whiteSmoke = new RgbColor(245, 245, 245);
        Colors.gainsboro = new RgbColor(220, 220, 220);
        Colors.oldLace = new RgbColor(255, 250, 240);
        Colors.cornsilk = new RgbColor(238, 232, 205);
        Colors.honeydew = new RgbColor(244, 238, 224);
        Colors.mintCream = new RgbColor(245, 255, 250);
        Colors.azure = new RgbColor(240, 255, 255);
        Colors.aliceBlue = new RgbColor(240, 248, 255);
        Colors.mistyRose = new RgbColor(255, 228, 225);
        Colors.slateGray = new RgbColor(112, 138, 144);
        Colors.midnightBlue = new RgbColor(25, 25, 112);
        Colors.navy = new RgbColor(0, 0, 128);
        Colors.royalBlue = new RgbColor(65, 105, 255);
        Colors.dodgerBlue = new RgbColor(30, 144, 255);
        Colors.deepSkyBlue = new RgbColor(0, 191, 255);
        Colors.steelBlue = new RgbColor(70, 130, 222);
        Colors.cadetBlue = new RgbColor(95, 158, 160);
        Colors.oliveGreen = new RgbColor(85, 107, 47);
        Colors.seaGreen = new RgbColor(46, 139, 87);
        Colors.lightSeaGreen = new RgbColor(32, 178, 170);
        Colors.forestGreen = new RgbColor(34, 139, 34);
        Colors.darkKhaki = new RgbColor(189, 183, 107);
        Colors.paleGoldenrod = new RgbColor(238, 232, 170);
        Colors.gold = new RgbColor(255, 215, 0);
        Colors.goldenrod = new RgbColor(218, 165, 32);
        Colors.darkGoldenrod = new RgbColor(184, 134, 11);
        Colors.indianRed = new RgbColor(205, 92, 92);
        Colors.saddleBrown = new RgbColor(139, 69, 19);
        Colors.sienna = new RgbColor(160, 82, 45);
        Colors.peru = new RgbColor(205, 133, 63);
        Colors.burlywood = new RgbColor(222, 184, 135);
        Colors.wheat = new RgbColor(245, 222, 179);
        Colors.tan = new RgbColor(210, 180, 140);
        Colors.firebrick = new RgbColor(178, 34, 34);
        Colors.salmon = new RgbColor(250, 128, 114);
        Colors.orange = new RgbColor(255, 165, 0);
        Colors.coral = new RgbColor(255, 127, 80);
        Colors.hotPink = new RgbColor(255, 105, 180);
        Colors.pink = new RgbColor(255, 192, 203);
        Colors.plum = new RgbColor(221, 160, 221);
        Colors.orchid = new RgbColor(218, 112, 214);
        Colors.violet = new RgbColor(138, 43, 226);
        Colors.thistle = new RgbColor(216, 191, 216);
        return Colors;
    })();
    Nifty.Colors = Colors;
})(Nifty || (Nifty = {}));
