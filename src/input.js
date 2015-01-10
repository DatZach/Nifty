/*
 *  input.ts
 *  Nifty HTML5 Game Engine
 *  Input Manager
 */
/// <reference path="system/input/keyboard.ts" />
/// <reference path="system/input/mouse.ts" />
var Nifty;
(function (Nifty) {
    (function (EventResult) {
        EventResult[EventResult["Block"] = 0] = "Block";
        EventResult[EventResult["Continue"] = 1] = "Continue";
    })(Nifty.EventResult || (Nifty.EventResult = {}));
    var EventResult = Nifty.EventResult;
    var KeyInputArgs = (function () {
        function KeyInputArgs(fKey, fPressed, fControl, fShift) {
            this.fKey = fKey;
            this.fPressed = fPressed;
            this.fControl = fControl;
            this.fShift = fShift;
        }
        KeyInputArgs.prototype.key = function () {
            return this.fKey;
        };
        KeyInputArgs.prototype.pressed = function () {
            return this.fPressed;
        };
        KeyInputArgs.prototype.control = function () {
            return this.fControl;
        };
        KeyInputArgs.prototype.shift = function () {
            return this.fShift;
        };
        return KeyInputArgs;
    })();
    Nifty.KeyInputArgs = KeyInputArgs;
    var TextInputArgs = (function () {
        function TextInputArgs(fText) {
            this.fText = fText;
        }
        TextInputArgs.prototype.text = function () {
            return this.fText;
        };
        return TextInputArgs;
    })();
    Nifty.TextInputArgs = TextInputArgs;
    var MouseButtonInputArgs = (function () {
        function MouseButtonInputArgs(fButton, fPressed, fPosition) {
            this.fButton = fButton;
            this.fPressed = fPressed;
            this.fPosition = fPosition;
        }
        MouseButtonInputArgs.prototype.button = function () {
            return this.fButton;
        };
        MouseButtonInputArgs.prototype.pressed = function () {
            return this.fPressed;
        };
        MouseButtonInputArgs.prototype.position = function () {
            return this.fPosition;
        };
        return MouseButtonInputArgs;
    })();
    Nifty.MouseButtonInputArgs = MouseButtonInputArgs;
    var MouseWheelInputArgs = (function () {
        function MouseWheelInputArgs(fDelta, fPosition) {
            this.fDelta = fDelta;
            this.fPosition = fPosition;
        }
        MouseWheelInputArgs.prototype.delta = function () {
            return this.fDelta;
        };
        MouseWheelInputArgs.prototype.position = function () {
            return this.fPosition;
        };
        return MouseWheelInputArgs;
    })();
    Nifty.MouseWheelInputArgs = MouseWheelInputArgs;
    var MouseMoveInputArgs = (function () {
        function MouseMoveInputArgs(position) {
            this.position = position;
        }
        return MouseMoveInputArgs;
    })();
    Nifty.MouseMoveInputArgs = MouseMoveInputArgs;
    var Input = (function () {
        function Input() {
            // TODO These should allow for multiple subscriptions
            //      private keys: { [key: number]: { (args: KeyInputArgs): boolean; }[] } = {};
            this.key = [];
            this.mouseButton = [];
            this.text = null;
            this.mouseWheel = null;
            this.mouseMove = null;
        }
        Input.prototype.processInput = function (args) {
            if (args instanceof KeyInputArgs) {
                var kArgs = args;
                if (this.key[kArgs.key()] !== undefined)
                    return this.key[kArgs.key()](kArgs);
            }
            else if (args instanceof TextInputArgs) {
                var tArgs = args;
                if (this.text !== null)
                    return this.text(tArgs);
            }
            else if (args instanceof MouseMoveInputArgs) {
                var mmArgs = args;
                if (this.mouseMove !== null)
                    return this.mouseMove(mmArgs);
            }
            else if (args instanceof MouseButtonInputArgs) {
                var mbArgs = args;
                if (this.mouseButton[mbArgs.button()] !== undefined)
                    return this.mouseButton[mbArgs.button()](mbArgs);
            }
            else if (args instanceof MouseWheelInputArgs) {
                var mwArgs = args;
                if (this.mouseWheel !== null)
                    return this.mouseWheel(mwArgs);
            }
            return 0 /* Block */;
        };
        return Input;
    })();
    Nifty.Input = Input;
})(Nifty || (Nifty = {}));
