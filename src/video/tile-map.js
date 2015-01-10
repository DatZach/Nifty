/*
 *  tile-map.ts
 *  Nifty HTML5 Game Engine
 *  Base Tile Map class
 */
/// <reference path="../system/rect.ts" />
var Nifty;
(function (Nifty) {
    var TileMap = (function () {
        function TileMap(width, height, tileSize) {
            this.width = width;
            this.height = height;
            this.tileSize = tileSize;
            this.tiles = [];
            for (var y = 0; y < height; ++y) {
                this.tiles[y] = [];
                for (var x = 0; x < width; ++x) {
                    this.tiles[y][x] = {
                        index: -1,
                        solid: false,
                        userData: null
                    };
                }
            }
        }
        TileMap.prototype.get = function (x, y) {
            return this.tiles[y][x];
        };
        TileMap.prototype.set = function (x, y, tile) {
            this.tiles[y][x] = tile;
        };
        TileMap.prototype.draw = function () {
        };
        TileMap.prototype.getDrawRegion = function () {
            var bounds = Nifty.getView().getViewport();
            return new Nifty.Rect(Math.floor(bounds.x / this.tileSize), Math.floor(bounds.y / this.tileSize), Math.floor(bounds.width / this.tileSize), Math.floor(bounds.height / this.tileSize));
        };
        TileMap.prototype.placeFree = function (rect, cond) {
            if (cond === void 0) { cond = null; }
            var minX = Math.max(0, Math.floor(rect.x / this.tileSize) - 1);
            var minY = Math.max(0, Math.floor(rect.y / this.tileSize) - 1);
            var maxX = Math.min(this.width, minX + Math.floor(rect.width / this.tileSize) + 3);
            var maxY = Math.min(this.height, minY + Math.floor(rect.height / this.tileSize) + 3);
            var testRect = new Nifty.Rect(0, 0, this.tileSize, this.tileSize);
            for (var y = minY; y < maxY; ++y) {
                for (var x = minX; x < maxX; ++x) {
                    if (!this.get(x, y).solid)
                        continue;
                    testRect.x = x * this.tileSize;
                    testRect.y = y * this.tileSize;
                    if (!rect.intersects(testRect))
                        continue;
                    if (cond == null)
                        return false;
                    if (cond(this.get(x, y), testRect, rect))
                        return false;
                }
            }
            return true;
        };
        TileMap.prototype.getTileSize = function () {
            return this.tileSize;
        };
        return TileMap;
    })();
    Nifty.TileMap = TileMap;
})(Nifty || (Nifty = {}));
