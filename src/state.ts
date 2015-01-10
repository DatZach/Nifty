/*
 *  state.ts
 *  Nifty HTML5 Game Engine
 *  Game State
 */

/// <reference path="video/camera.ts" />
/// <reference path="video/color.ts" />
/// <reference path="entity-manager.ts" />
/// <reference path="asset-manager.ts" />

module Nifty {
    export class State {
        public camera: Camera = null;
        public entities: EntityManager = null;
        
        protected inactiveMode: UpdateMode = UpdateMode.All;
        protected clearColor: Color = Colors.cornflowerBlue.clone();
        protected isOverlay: boolean = false;

        private fInput: Input = null;
        
        constructor() {
            this.entities = new EntityManager(this);
        }
        
        public initializeCamera(): void {
            var o = this.camera;
            this.camera = new Camera(getDefaultView());
            
            if (o != null) {
                this.camera.position = o.position;
                this.camera._actualPosition = o._actualPosition;
            }
        }
        
        public preload(): Assets.PreloadRules {
            return {
                assets: [],
                draw: null
            };
        }

        public enter(): void {

        }

        public leave(): void {

        }

        public update(): void {

        }

        public draw(): void {

        }
        
        public input(): Input {
            return this.fInput = this.fInput || new Input();
        }

        public getInactiveMode(): UpdateMode {
            return this.inactiveMode;
        }

        public getClearColor(): Color {
            return this.clearColor;
        }

        public getIsOverlay(): boolean {
            return this.isOverlay;
        }

        // NOTE There's no real clean way to hide theses away in TypeScript/Javascript sadly
        //      Developers should never be calling or overloading any the methods below.
        public processEvent(args: Object): EventResult {
            // If the state has an event subscribed to the input manager and it requests that
            // future input is blocked then we block input from all entities.
            if (this.fInput != null && this.fInput.processInput(args) == EventResult.Block)
                return EventResult.Block;
            
            return this.entities.processInput(args);
        }
        
        public updateInternal(): void {
            this.update();
            this.entities.update();
            this.camera.update();
        }
        
        public drawInternal(): void {
            this.camera.apply();
            this.draw();
            this.entities.draw();
        }
    }

    export enum UpdateMode {
        None = 0,
        Input = 1,
        Update = 2,
        Draw = 4,
        Background = 6,
        All = 7
    }
}
