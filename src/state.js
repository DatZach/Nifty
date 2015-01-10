/*
 *  state.ts
 *  Nifty HTML5 Game Engine
 *  Game State
 */
/// <reference path="video/camera.ts" />
/// <reference path="video/color.ts" />
/// <reference path="entity-manager.ts" />
/// <reference path="asset-manager.ts" />
var Nifty;
(function (Nifty) {
    var State = (function () {
        function State() {
            this.camera = null;
            this.entities = null;
            this.inactiveMode = 7 /* All */;
            this.clearColor = Nifty.Colors.cornflowerBlue.clone();
            this.isOverlay = false;
            this.fInput = null;
            this.entities = new Nifty.EntityManager(this);
        }
        State.prototype.initializeCamera = function () {
            var o = this.camera;
            this.camera = new Nifty.Camera(Nifty.getDefaultView());
            if (o != null) {
                this.camera.position = o.position;
                this.camera._actualPosition = o._actualPosition;
            }
        };
        State.prototype.preload = function () {
            return {
                assets: [],
                draw: null
            };
        };
        State.prototype.enter = function () {
        };
        State.prototype.leave = function () {
        };
        State.prototype.update = function () {
        };
        State.prototype.draw = function () {
        };
        State.prototype.input = function () {
            return this.fInput = this.fInput || new Nifty.Input();
        };
        State.prototype.getInactiveMode = function () {
            return this.inactiveMode;
        };
        State.prototype.getClearColor = function () {
            return this.clearColor;
        };
        State.prototype.getIsOverlay = function () {
            return this.isOverlay;
        };
        // NOTE There's no real clean way to hide theses away in TypeScript/Javascript sadly
        //      Developers should never be calling or overloading any the methods below.
        State.prototype.processEvent = function (args) {
            // If the state has an event subscribed to the input manager and it requests that
            // future input is blocked then we block input from all entities.
            if (this.fInput != null && this.fInput.processInput(args) == 0 /* Block */)
                return 0 /* Block */;
            return this.entities.processInput(args);
        };
        State.prototype.updateInternal = function () {
            this.update();
            this.entities.update();
            this.camera.update();
        };
        State.prototype.drawInternal = function () {
            this.camera.apply();
            this.draw();
            this.entities.draw();
        };
        return State;
    })();
    Nifty.State = State;
    (function (UpdateMode) {
        UpdateMode[UpdateMode["None"] = 0] = "None";
        UpdateMode[UpdateMode["Input"] = 1] = "Input";
        UpdateMode[UpdateMode["Update"] = 2] = "Update";
        UpdateMode[UpdateMode["Draw"] = 4] = "Draw";
        UpdateMode[UpdateMode["Background"] = 6] = "Background";
        UpdateMode[UpdateMode["All"] = 7] = "All";
    })(Nifty.UpdateMode || (Nifty.UpdateMode = {}));
    var UpdateMode = Nifty.UpdateMode;
})(Nifty || (Nifty = {}));
