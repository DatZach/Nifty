/*
 *  entity.ts
 *  Nifty HTML5 Game Engine
 *  Game Entity
 */
/// <reference path="system/point.ts" />
/// <reference path="system/rect.ts" />
/// <reference path="input.ts" />
var Nifty;
(function (Nifty) {
    var Entity = (function () {
        function Entity() {
            this.parent = null;
            this.solid = false;
            this.depth = 0;
            this.position = new Nifty.Point();
            this.origin = new Nifty.Point();
            this.size = new Nifty.Point();
            this.scale = new Nifty.Point(1.0, 1.0);
            // Internal fields, for engine use only
            this._gridCoordinate = null;
            // TODO This can be a property
            this._input = null;
        }
        Entity.prototype.create = function () {
        };
        Entity.prototype.destroy = function () {
        };
        Entity.prototype.update = function () {
        };
        Entity.prototype.draw = function () {
        };
        Entity.prototype.input = function () {
            return this._input = this._input || new Nifty.Input();
        };
        Entity.prototype.getBoundingBox = function () {
            return new Nifty.Rect(this.position.x - this.origin.x * this.scale.x, this.position.y - this.origin.y * this.scale.y, this.size.x * this.scale.x, this.size.y * this.scale.y);
        };
        return Entity;
    })();
    Nifty.Entity = Entity;
})(Nifty || (Nifty = {}));
