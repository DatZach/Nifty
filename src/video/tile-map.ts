/*
 *  tile-map.ts
 *  Nifty HTML5 Game Engine
 *  Base Tile Map class
 */

/// <reference path="../system/rect.ts" />

module Nifty {
    export interface Tile {
        index: number;
        solid: boolean;
        userData: Object;
    }
    
    export class TileMap {
        protected tiles: Tile[][];
        
        constructor(private width: number,
                    private height: number,
                    private tileSize: number) {
            this.tiles = [];
                        
            for(var y = 0; y < height; ++y) {
                this.tiles[y] = [];
                
                for(var x = 0; x < width; ++x) {
                    this.tiles[y][x] = {
                        index: -1,
                        solid: false,
                        userData: null
                    };
                }
            }       
        }
    
        public get(x: number, y: number): Tile {
            return this.tiles[y][x];
        }
    
        public set(x: number, y: number, tile: Tile): void {
            this.tiles[y][x] = tile;
        }
    
        public draw(): void {
            
        }
    
        public getDrawRegion(): Rect {
            var bounds = getView().getViewport();
            return new Rect(
                Math.floor(bounds.x / this.tileSize),
                Math.floor(bounds.y / this.tileSize),
                Math.floor(bounds.width / this.tileSize),
                Math.floor(bounds.height / this.tileSize)
            );
        }
    
        public placeFree(rect: Rect, cond: (t: Tile, tileBounds: Rect, collisionBounds: Rect) => boolean = null): boolean {
            var minX = Math.max(0, Math.floor(rect.x / this.tileSize) - 1);
            var minY = Math.max(0, Math.floor(rect.y / this.tileSize) - 1);
            var maxX = Math.min(this.width, minX + Math.floor(rect.width / this.tileSize) + 3);
            var maxY = Math.min(this.height, minY + Math.floor(rect.height / this.tileSize) + 3);
            var testRect = new Rect(0, 0, this.tileSize, this.tileSize);
            
            for(var y = minY; y < maxY; ++y) {
                for(var x = minX; x < maxX; ++x) {
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
        }
        
        protected getTileSize(): number {
            return this.tileSize;
        }
    }
}
