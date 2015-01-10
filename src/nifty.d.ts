/// <reference path="lib/jquery-1.11.1.d.ts" />
/// <reference path="system/util.d.ts" />
/// <reference path="system/point.d.ts" />
/// <reference path="system/rect.d.ts" />
/// <reference path="video/backend/render-target.d.ts" />
/// <reference path="video/tile-map.d.ts" />
/// <reference path="state.d.ts" />
/// <reference path="timer.d.ts" />
declare module Nifty {
    var Version: string;
    var settings: {
        greet: boolean;
        canvasElement: string;
        assetsPath: string;
        texturesPath: string;
        audioPath: string;
        fontPath: string;
        musicVolume: number;
        soundVolume: number;
        globalVolume: number;
        entityGridSize: number;
        entityOverscan: number;
        timestep: number;
        maxUpdatesPerFrame: number;
    };
    var framerate: number;
    var lagging: (delta: any) => void;
    function initialize(): void;
    function run(): void;
    function pushState(state: State): void;
    function popState(): void;
    function setState(state: State): void;
    function setFullscreen(value: boolean): void;
}
