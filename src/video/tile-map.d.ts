/// <reference path="../system/rect.d.ts" />
declare module Nifty {
    interface Tile {
        index: number;
        solid: boolean;
        userData: Object;
    }
    class TileMap {
        private width;
        private height;
        private tileSize;
        protected tiles: Tile[][];
        constructor(width: number, height: number, tileSize: number);
        get(x: number, y: number): Tile;
        set(x: number, y: number, tile: Tile): void;
        draw(): void;
        getDrawRegion(): Rect;
        placeFree(rect: Rect, cond?: (t: Tile, tileBounds: Rect, collisionBounds: Rect) => boolean): boolean;
        protected getTileSize(): number;
    }
}
