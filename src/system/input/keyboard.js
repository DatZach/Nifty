/*
 *  keyboard.ts
 *  Nifty HTML5 Game Engine
 *  Keyboard Input Manager
 */
var Nifty;
(function (Nifty) {
    var Keyboard = (function () {
        function Keyboard() {
        }
        Keyboard.isKeyPressed = function (key) {
            return this.keyState[key] || false;
        };
        // Internal use
        Keyboard._translateKeyCode = function (keyCode) {
            return this.keyCodeLookupTable[keyCode] || 0 /* Unknown */;
        };
        Keyboard._setKeyState = function (key, value) {
            this.keyState[key] = value;
        };
        Keyboard.keyCodeLookupTable = {
            8: 57 /* BackSpace */,
            9: 58 /* Tab */,
            13: 56 /* Return */,
            16: 39 /* Shift */,
            17: 38 /* Control */,
            18: 40 /* Alt */,
            19: 101 /* Pause */,
            20: 100 /* CapsLock */,
            27: 37 /* Escape */,
            32: 55 /* Space */,
            33: 59 /* PageUp */,
            34: 60 /* PageDown */,
            35: 61 /* End */,
            36: 62 /* Home */,
            37: 69 /* Left */,
            38: 71 /* Up */,
            39: 70 /* Right */,
            40: 72 /* Down */,
            45: 63 /* Insert */,
            46: 64 /* Delete */,
            48: 27 /* Num0 */,
            49: 28 /* Num1 */,
            50: 29 /* Num2 */,
            51: 30 /* Num3 */,
            52: 31 /* Num4 */,
            53: 32 /* Num5 */,
            54: 33 /* Num6 */,
            55: 34 /* Num7 */,
            56: 35 /* Num8 */,
            57: 36 /* Num9 */,
            65: 1 /* A */,
            66: 2 /* B */,
            67: 3 /* C */,
            68: 4 /* D */,
            69: 5 /* E */,
            70: 6 /* F */,
            71: 7 /* G */,
            72: 8 /* H */,
            73: 9 /* I */,
            74: 10 /* J */,
            75: 11 /* K */,
            76: 12 /* L */,
            77: 13 /* M */,
            78: 14 /* N */,
            79: 15 /* O */,
            80: 16 /* P */,
            81: 17 /* Q */,
            82: 18 /* R */,
            83: 19 /* S */,
            84: 20 /* T */,
            85: 21 /* U */,
            86: 22 /* V */,
            87: 23 /* W */,
            88: 24 /* X */,
            89: 25 /* Y */,
            90: 26 /* Z */,
            91: 41 /* LSystem */,
            92: 42 /* RSystem */,
            96: 73 /* Numpad0 */,
            97: 74 /* Numpad1 */,
            98: 75 /* Numpad2 */,
            99: 76 /* Numpad3 */,
            100: 77 /* Numpad4 */,
            101: 78 /* Numpad5 */,
            102: 79 /* Numpad6 */,
            103: 80 /* Numpad7 */,
            104: 81 /* Numpad8 */,
            105: 82 /* Numpad9 */,
            106: 67 /* Multiply */,
            107: 65 /* Add */,
            109: 66 /* Subtract */,
            110: 48 /* Period */,
            111: 68 /* Divide */,
            112: 83 /* F1 */,
            113: 84 /* F2 */,
            114: 85 /* F3 */,
            115: 86 /* F4 */,
            116: 87 /* F5 */,
            117: 88 /* F6 */,
            118: 89 /* F7 */,
            119: 90 /* F8 */,
            120: 91 /* F9 */,
            121: 92 /* F10 */,
            122: 93 /* F11 */,
            123: 94 /* F12 */,
            144: 99 /* NumLock */,
            145: 98 /* ScrollLock */,
            186: 46 /* SemiColon */,
            187: 53 /* Equal */,
            188: 47 /* Comma */,
            189: 54 /* Dash */,
            190: 48 /* Period */,
            191: 50 /* Slash */,
            192: 52 /* Grave */,
            219: 44 /* LBracket */,
            220: 51 /* BackSlash */,
            221: 45 /* RBracket */,
            222: 49 /* Quote */
        };
        Keyboard.keyState = {};
        return Keyboard;
    })();
    Nifty.Keyboard = Keyboard;
    (function (Key) {
        Key[Key["Unknown"] = 0] = "Unknown";
        Key[Key["A"] = 1] = "A";
        Key[Key["B"] = 2] = "B";
        Key[Key["C"] = 3] = "C";
        Key[Key["D"] = 4] = "D";
        Key[Key["E"] = 5] = "E";
        Key[Key["F"] = 6] = "F";
        Key[Key["G"] = 7] = "G";
        Key[Key["H"] = 8] = "H";
        Key[Key["I"] = 9] = "I";
        Key[Key["J"] = 10] = "J";
        Key[Key["K"] = 11] = "K";
        Key[Key["L"] = 12] = "L";
        Key[Key["M"] = 13] = "M";
        Key[Key["N"] = 14] = "N";
        Key[Key["O"] = 15] = "O";
        Key[Key["P"] = 16] = "P";
        Key[Key["Q"] = 17] = "Q";
        Key[Key["R"] = 18] = "R";
        Key[Key["S"] = 19] = "S";
        Key[Key["T"] = 20] = "T";
        Key[Key["U"] = 21] = "U";
        Key[Key["V"] = 22] = "V";
        Key[Key["W"] = 23] = "W";
        Key[Key["X"] = 24] = "X";
        Key[Key["Y"] = 25] = "Y";
        Key[Key["Z"] = 26] = "Z";
        Key[Key["Num0"] = 27] = "Num0";
        Key[Key["Num1"] = 28] = "Num1";
        Key[Key["Num2"] = 29] = "Num2";
        Key[Key["Num3"] = 30] = "Num3";
        Key[Key["Num4"] = 31] = "Num4";
        Key[Key["Num5"] = 32] = "Num5";
        Key[Key["Num6"] = 33] = "Num6";
        Key[Key["Num7"] = 34] = "Num7";
        Key[Key["Num8"] = 35] = "Num8";
        Key[Key["Num9"] = 36] = "Num9";
        Key[Key["Escape"] = 37] = "Escape";
        Key[Key["Control"] = 38] = "Control";
        Key[Key["Shift"] = 39] = "Shift";
        Key[Key["Alt"] = 40] = "Alt";
        Key[Key["LSystem"] = 41] = "LSystem";
        Key[Key["RSystem"] = 42] = "RSystem";
        Key[Key["Menu"] = 43] = "Menu";
        Key[Key["LBracket"] = 44] = "LBracket";
        Key[Key["RBracket"] = 45] = "RBracket";
        Key[Key["SemiColon"] = 46] = "SemiColon";
        Key[Key["Comma"] = 47] = "Comma";
        Key[Key["Period"] = 48] = "Period";
        Key[Key["Quote"] = 49] = "Quote";
        Key[Key["Slash"] = 50] = "Slash";
        Key[Key["BackSlash"] = 51] = "BackSlash";
        Key[Key["Grave"] = 52] = "Grave";
        Key[Key["Equal"] = 53] = "Equal";
        Key[Key["Dash"] = 54] = "Dash";
        Key[Key["Space"] = 55] = "Space";
        Key[Key["Return"] = 56] = "Return";
        Key[Key["BackSpace"] = 57] = "BackSpace";
        Key[Key["Tab"] = 58] = "Tab";
        Key[Key["PageUp"] = 59] = "PageUp";
        Key[Key["PageDown"] = 60] = "PageDown";
        Key[Key["End"] = 61] = "End";
        Key[Key["Home"] = 62] = "Home";
        Key[Key["Insert"] = 63] = "Insert";
        Key[Key["Delete"] = 64] = "Delete";
        Key[Key["Add"] = 65] = "Add";
        Key[Key["Subtract"] = 66] = "Subtract";
        Key[Key["Multiply"] = 67] = "Multiply";
        Key[Key["Divide"] = 68] = "Divide";
        Key[Key["Left"] = 69] = "Left";
        Key[Key["Right"] = 70] = "Right";
        Key[Key["Up"] = 71] = "Up";
        Key[Key["Down"] = 72] = "Down";
        Key[Key["Numpad0"] = 73] = "Numpad0";
        Key[Key["Numpad1"] = 74] = "Numpad1";
        Key[Key["Numpad2"] = 75] = "Numpad2";
        Key[Key["Numpad3"] = 76] = "Numpad3";
        Key[Key["Numpad4"] = 77] = "Numpad4";
        Key[Key["Numpad5"] = 78] = "Numpad5";
        Key[Key["Numpad6"] = 79] = "Numpad6";
        Key[Key["Numpad7"] = 80] = "Numpad7";
        Key[Key["Numpad8"] = 81] = "Numpad8";
        Key[Key["Numpad9"] = 82] = "Numpad9";
        Key[Key["F1"] = 83] = "F1";
        Key[Key["F2"] = 84] = "F2";
        Key[Key["F3"] = 85] = "F3";
        Key[Key["F4"] = 86] = "F4";
        Key[Key["F5"] = 87] = "F5";
        Key[Key["F6"] = 88] = "F6";
        Key[Key["F7"] = 89] = "F7";
        Key[Key["F8"] = 90] = "F8";
        Key[Key["F9"] = 91] = "F9";
        Key[Key["F10"] = 92] = "F10";
        Key[Key["F11"] = 93] = "F11";
        Key[Key["F12"] = 94] = "F12";
        Key[Key["F13"] = 95] = "F13";
        Key[Key["F14"] = 96] = "F14";
        Key[Key["F15"] = 97] = "F15";
        Key[Key["ScrollLock"] = 98] = "ScrollLock";
        Key[Key["NumLock"] = 99] = "NumLock";
        Key[Key["CapsLock"] = 100] = "CapsLock";
        Key[Key["Pause"] = 101] = "Pause";
    })(Nifty.Key || (Nifty.Key = {}));
    var Key = Nifty.Key;
})(Nifty || (Nifty = {}));
