/*
 *  mouse.ts
 *  Nifty HTML5 Game Engine
 *  Mouse Input Manager
 */
var Nifty;
(function (Nifty) {
    var Mouse = (function () {
        function Mouse() {
        }
        Mouse.isButtonPressed = function (button) {
            return this.mouseButtonState[button] || false;
        };
        Mouse.getPosition = function () {
            return this.mousePosition;
        };
        // Internal use
        Mouse._translateMouseButton = function (button) {
            return this.mouseButtonLookup[button] || 0 /* Unknown */;
        };
        Mouse._setButtonState = function (button, value) {
            this.mouseButtonState[button] = value;
        };
        Mouse._setPosition = function (point) {
            this.mousePosition = point;
        };
        Mouse.mouseButtonLookup = {
            0: 1 /* Left */,
            1: 3 /* Middle */,
            2: 2 /* Right */
        };
        Mouse.mouseButtonState = {};
        Mouse.mousePosition = new Nifty.Point();
        return Mouse;
    })();
    Nifty.Mouse = Mouse;
    (function (Button) {
        Button[Button["Unknown"] = 0] = "Unknown";
        Button[Button["Left"] = 1] = "Left";
        Button[Button["Right"] = 2] = "Right";
        Button[Button["Middle"] = 3] = "Middle";
    })(Nifty.Button || (Nifty.Button = {}));
    var Button = Nifty.Button;
})(Nifty || (Nifty = {}));
