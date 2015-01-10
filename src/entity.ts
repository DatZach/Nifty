/*
 *  entity.ts
 *  Nifty HTML5 Game Engine
 *  Game Entity
 */

/// <reference path="system/point.ts" />
/// <reference path="system/rect.ts" />
/// <reference path="input.ts" />

module Nifty {
    export class Entity {
        public parent: State = null;
        public solid: boolean = false;
        public depth: number = 0;
        public position: Point = new Point();
        public origin: Point = new Point();
        public size: Point = new Point();
        public scale: Point = new Point(1.0, 1.0);
        
        // Internal fields, for engine use only
        public _gridCoordinate: Point = null;
        
        // TODO This can be a property
        private _input: Input = null;
        
        public create(): void {
            
        }
        
        public destroy(): void {
            
        }
        
        public update(): void {
            
        }
        
        public draw(): void {
            
        }
        
        public input(): Input {
            return this._input = this._input || new Input();
        }
        
        public getBoundingBox(): Rect {
            return new Rect(
                this.position.x - this.origin.x * this.scale.x,
                this.position.y - this.origin.y * this.scale.y,
                this.size.x * this.scale.x,
                this.size.y * this.scale.y
            );
        }
    }
}
