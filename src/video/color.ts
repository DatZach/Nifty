/*
 *  color.ts
 *  Nifty Video Subsystem
 *  Common RGBA Color
 */

module Nifty {
    export interface GlColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }

    export class Color {
        public getGlColor(): GlColor {
            return {
                r: 0.0,
                g: 0.0,
                b: 0.0,
                a: 0.0
            };
        }
        
        public getCssColor(): string {
            return '';
        }
    }

    export class RgbColor extends Color {
        constructor(public r: number,
                    public g: number,
                    public b: number,
                    public a: number = 255) {
            super();
        }

        public getGlColor(): GlColor {
            return {
                r: this.r / 255.0,
                g: this.g / 255.0,
                b: this.b / 255.0,
                a: this.a / 255.0
            };
        }
        
        public getCssColor(): string {
            return 'rgba(' + this.r + ', ' +
                             this.g + ', ' +
                             this.b + ', ' +
                             this.a / 255.0 + ')';
        }

        public clone(): RgbColor {
			return new RgbColor(this.r, this.g, this.b, this.a);
		}
    }

    export class HsvColor extends Color {
        constructor(public h: number,
                    public s: number,
                    public v: number,
                    public a: number = 255) {
            super();
        }

        public getGlColor(): GlColor {
            var h = this.h / 360.0 * 6,
                s = this.s / 100.0,
                v = this.v / 100.0;

            var i = Math.floor(h),
                f = h - i,
                p = v * (1.0 - s),
                q = v * (1.0 - f * s),
                t = v * (1.0 - (1.0 - f) * s),
                mod = i % 6;

            return {
                r: [ v, q, p, p, t, v ][mod],
                g: [ t, v, v, q, p, p ][mod],
                b: [ p, p, t, v, v, q ][mod],
                a: this.a / 255.0
            };
        }
        
        public getCssColor(): string {
            return 'hsla(' + this.h + ', ' +
                           + this.s + '%, ' +
                           + this.v + '%, ' +
                           + this.a / 255.0 + ')';
        }

        public clone(): HsvColor {
            return new HsvColor(this.h, this.s, this.v, this.a);
        }
    }

    export class Colors {
        static white = new RgbColor(255, 255, 255);
        static black = new RgbColor(0, 0, 0);
        static red = new RgbColor(255, 0, 0);
        static green = new RgbColor(0, 255, 0);
        static blue = new RgbColor(0, 0, 255);
        static yellow = new RgbColor(255, 255, 0);
        static magenta = new RgbColor(255, 0, 255);
        static cyan = new RgbColor(0, 255, 255);
        static transparent = new RgbColor(0, 0, 0, 0);

        static cornflowerBlue = new RgbColor(100, 149, 237);
        static peach = new RgbColor(255, 218, 185);
        static snow = new RgbColor(255, 250, 250);
        static ghostWhite = new RgbColor(248, 248, 255);
        static whiteSmoke = new RgbColor(245, 245, 245);
        static gainsboro = new RgbColor(220, 220, 220);
        static oldLace = new RgbColor(255, 250, 240);
        static cornsilk = new RgbColor(238, 232, 205);
        static honeydew = new RgbColor(244, 238, 224);
        static mintCream = new RgbColor(245, 255, 250);
        static azure = new RgbColor(240, 255, 255);
        static aliceBlue = new RgbColor(240, 248, 255);
        static mistyRose = new RgbColor(255, 228, 225);
        static slateGray = new RgbColor(112, 138, 144);
        static midnightBlue = new RgbColor(25, 25, 112);
        static navy = new RgbColor(0, 0, 128);
        static royalBlue = new RgbColor(65, 105, 255);
        static dodgerBlue = new RgbColor(30, 144, 255);
        static deepSkyBlue = new RgbColor(0, 191, 255);
        static steelBlue = new RgbColor(70, 130, 222);
        static cadetBlue = new RgbColor(95, 158, 160);
        static oliveGreen = new RgbColor(85, 107, 47);
        static seaGreen = new RgbColor(46, 139, 87);
        static lightSeaGreen = new RgbColor(32, 178, 170);
        static forestGreen = new RgbColor(34, 139, 34);
        static darkKhaki = new RgbColor(189, 183, 107);
        static paleGoldenrod = new RgbColor(238, 232, 170);
        static gold = new RgbColor(255, 215, 0);
        static goldenrod = new RgbColor(218, 165, 32);
        static darkGoldenrod = new RgbColor(184, 134, 11);
        static indianRed = new RgbColor(205, 92, 92);
        static saddleBrown = new RgbColor(139, 69, 19);
        static sienna = new RgbColor(160, 82, 45);
        static peru = new RgbColor(205, 133, 63);
        static burlywood = new RgbColor(222, 184, 135);
        static wheat = new RgbColor(245, 222, 179);
        static tan = new RgbColor(210, 180, 140);
        static firebrick = new RgbColor(178, 34, 34);
        static salmon = new RgbColor(250, 128, 114);
        static orange = new RgbColor(255, 165, 0);
        static coral = new RgbColor(255, 127, 80);
        static hotPink = new RgbColor(255, 105, 180);
        static pink = new RgbColor(255, 192, 203);
        static plum = new RgbColor(221, 160, 221);
        static orchid = new RgbColor(218, 112, 214);
        static violet = new RgbColor(138, 43, 226);
        static thistle = new RgbColor(216, 191, 216);
  
        constructor() {
            // Work around TypeScript being fucking retarded
            // TODO Fix this hack
        }
    }
}
