declare module Nifty {
    interface GlColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    class Color {
        getGlColor(): GlColor;
        getCssColor(): string;
    }
    class RgbColor extends Color {
        r: number;
        g: number;
        b: number;
        a: number;
        constructor(r: number, g: number, b: number, a?: number);
        getGlColor(): GlColor;
        getCssColor(): string;
        clone(): RgbColor;
    }
    class HsvColor extends Color {
        h: number;
        s: number;
        v: number;
        a: number;
        constructor(h: number, s: number, v: number, a?: number);
        getGlColor(): GlColor;
        getCssColor(): string;
        clone(): HsvColor;
    }
    class Colors {
        static white: RgbColor;
        static black: RgbColor;
        static red: RgbColor;
        static green: RgbColor;
        static blue: RgbColor;
        static yellow: RgbColor;
        static magenta: RgbColor;
        static cyan: RgbColor;
        static transparent: RgbColor;
        static cornflowerBlue: RgbColor;
        static peach: RgbColor;
        static snow: RgbColor;
        static ghostWhite: RgbColor;
        static whiteSmoke: RgbColor;
        static gainsboro: RgbColor;
        static oldLace: RgbColor;
        static cornsilk: RgbColor;
        static honeydew: RgbColor;
        static mintCream: RgbColor;
        static azure: RgbColor;
        static aliceBlue: RgbColor;
        static mistyRose: RgbColor;
        static slateGray: RgbColor;
        static midnightBlue: RgbColor;
        static navy: RgbColor;
        static royalBlue: RgbColor;
        static dodgerBlue: RgbColor;
        static deepSkyBlue: RgbColor;
        static steelBlue: RgbColor;
        static cadetBlue: RgbColor;
        static oliveGreen: RgbColor;
        static seaGreen: RgbColor;
        static lightSeaGreen: RgbColor;
        static forestGreen: RgbColor;
        static darkKhaki: RgbColor;
        static paleGoldenrod: RgbColor;
        static gold: RgbColor;
        static goldenrod: RgbColor;
        static darkGoldenrod: RgbColor;
        static indianRed: RgbColor;
        static saddleBrown: RgbColor;
        static sienna: RgbColor;
        static peru: RgbColor;
        static burlywood: RgbColor;
        static wheat: RgbColor;
        static tan: RgbColor;
        static firebrick: RgbColor;
        static salmon: RgbColor;
        static orange: RgbColor;
        static coral: RgbColor;
        static hotPink: RgbColor;
        static pink: RgbColor;
        static plum: RgbColor;
        static orchid: RgbColor;
        static violet: RgbColor;
        static thistle: RgbColor;
        constructor();
    }
}
