/*
 *  entity-manager.ts
 *  Nifty HTML5 Game Engine
 *  Entity Manager
 */
/// <reference path="entity.ts" />
/// <reference path="state.ts" />
/// <reference path="input.ts" />
var Nifty;
(function (Nifty) {
    var EntityGrid = (function () {
        function EntityGrid() {
            this.grid = {};
        }
        EntityGrid.prototype.add = function (e) {
            var idx = (e._gridCoordinate.x & 0xFFFF) << 16 | e._gridCoordinate.y & 0xFFFF;
            if (this.grid[idx] == undefined)
                this.grid[idx] = [];
            this.grid[idx].push(e);
        };
        EntityGrid.prototype.remove = function (e) {
            var idx = (e._gridCoordinate.x & 0xFFFF) << 16 | e._gridCoordinate.y & 0xFFFF;
            if (this.grid[idx] == undefined)
                return;
            var eIdx = this.grid[idx].indexOf(e);
            if (eIdx >= 0)
                this.grid[idx].splice(eIdx, 1);
        };
        EntityGrid.prototype.get = function (x, y) {
            return this.grid[(x & 0xFFFF) << 16 | y & 0xFFFF];
        };
        EntityGrid.prototype.clear = function () {
            this.grid = {};
        };
        EntityGrid.prototype.sweep = function () {
            for (var p in this.grid) {
                if (this.grid[p].length == 0) {
                    this.grid[p] = null;
                    delete this.grid[p];
                }
            }
        };
        return EntityGrid;
    })();
    var EntityManager = (function () {
        function EntityManager(parent) {
            this.entities = [];
            this.inputEntities = [];
            this.entityGrid = new EntityGrid();
            this.parent = null;
            this.currentEntity = null;
            this.cleanupTimer = 0;
            this.parent = parent;
        }
        EntityManager.prototype.processInput = function (args) {
            for (var i = 0; i < this.inputEntities.length; ++i) {
                var entity = this.inputEntities[i];
                if (entity.input().processInput(args) == 0 /* Block */)
                    return 0 /* Block */;
            }
            return 1 /* Continue */;
        };
        EntityManager.prototype.update = function () {
            var newGridPos = new Nifty.Point();
            for (var i = 0; i < this.entities.length; ++i) {
                var entity = this.entities[i];
                this.currentEntity = entity;
                entity.update();
                this.currentEntity = null;
                newGridPos.x = entity.position.x / Nifty.settings.entityGridSize;
                newGridPos.y = entity.position.y / Nifty.settings.entityGridSize;
                newGridPos.floor();
                if (!entity._gridCoordinate.equals(newGridPos)) {
                    this.entityGrid.remove(entity);
                    entity._gridCoordinate = newGridPos.clone();
                    this.entityGrid.add(entity);
                }
            }
            this.cleanupTimer += Nifty.settings.timestep;
            if (this.cleanupTimer > 60.0) {
                this.entityGrid.sweep();
                this.cleanupTimer = 0;
            }
        };
        EntityManager.prototype.draw = function () {
            var view = Nifty.getView();
            var entities = this.inArea(view.getViewport());
            entities.sort(function (a, b) { return a.depth - b.depth; });
            for (var i = 0; i < entities.length; ++i)
                entities[i].draw();
        };
        EntityManager.prototype.add = function (entity) {
            entity.parent = this.parent;
            entity._gridCoordinate = entity.position.divide(Nifty.settings.entityGridSize, Nifty.settings.entityGridSize).floor();
            this.entities.push(entity);
            this.entityGrid.add(entity);
            var previousEntity = this.currentEntity;
            this.currentEntity = entity;
            entity.create();
            this.currentEntity = previousEntity;
            // TODO Always true
            if (entity.input() !== null)
                this.inputEntities.push(entity);
        };
        EntityManager.prototype.remove = function (entity) {
            var index = this.entities.indexOf(entity);
            if (index == -1)
                return;
            var previousEntity = this.currentEntity;
            this.currentEntity = entity;
            entity.destroy();
            this.currentEntity = previousEntity;
            this.entityGrid.remove(entity);
            this.entities.splice(index, 1);
            // TODO Always true
            if (entity.input() !== null)
                this.inputEntities.splice(this.inputEntities.indexOf(entity), 1);
        };
        EntityManager.prototype.clear = function () {
            for (var i = 0; i < this.entities.length; ++i)
                this.entities[i].destroy();
            while (this.entities.length)
                this.entities.pop();
            while (this.inputEntities.length)
                this.inputEntities.pop();
            this.entityGrid.clear();
        };
        EntityManager.prototype.inArea = function (areaRect) {
            var overscan = Nifty.settings.entityOverscan;
            var gridSize = Nifty.settings.entityGridSize;
            var rect = new Nifty.Rect(areaRect.x - overscan, areaRect.y - overscan, areaRect.width + overscan * 2, areaRect.height + overscan * 2);
            var startX = Math.floor(rect.x / gridSize);
            var startY = Math.floor(rect.y / gridSize);
            var width = Math.floor(rect.width / gridSize + 1);
            var height = Math.floor(rect.height / gridSize + 1);
            var entities = [];
            for (var y = startY; y < startY + height; ++y) {
                for (var x = startX; x < startX + width; ++x) {
                    var cellEntities = this.entityGrid.get(x, y);
                    if (cellEntities != undefined)
                        entities = entities.concat(cellEntities);
                }
            }
            return entities;
        };
        EntityManager.prototype.placeFree = function (rect) {
            var areaEntities = this.inArea(rect);
            var entities = [];
            for (var i = 0; i < areaEntities.length; ++i) {
                var entity = areaEntities[i];
                if (!(entity == this.currentEntity || !entity.solid || !entity.getBoundingBox().intersects(rect)))
                    return false;
            }
            return true;
        };
        EntityManager.prototype.get = function () {
            return this.entities;
        };
        return EntityManager;
    })();
    Nifty.EntityManager = EntityManager;
})(Nifty || (Nifty = {}));
