/// <reference path="video/camera.d.ts" />
/// <reference path="video/color.d.ts" />
/// <reference path="entity-manager.d.ts" />
/// <reference path="asset-manager.d.ts" />
declare module Nifty {
    class State {
        camera: Camera;
        entities: EntityManager;
        protected inactiveMode: UpdateMode;
        protected clearColor: Color;
        protected isOverlay: boolean;
        private fInput;
        constructor();
        initializeCamera(): void;
        preload(): Assets.PreloadRules;
        enter(): void;
        leave(): void;
        update(): void;
        draw(): void;
        input(): Input;
        getInactiveMode(): UpdateMode;
        getClearColor(): Color;
        getIsOverlay(): boolean;
        processEvent(args: Object): EventResult;
        updateInternal(): void;
        drawInternal(): void;
    }
    enum UpdateMode {
        None = 0,
        Input = 1,
        Update = 2,
        Draw = 4,
        Background = 6,
        All = 7,
    }
}
