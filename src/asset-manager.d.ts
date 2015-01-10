/// <reference path="system/util.d.ts" />
/// <reference path="video/rectangle-shape.d.ts" />
declare module Nifty.Assets {
    interface PreloadRules {
        assets: string[];
        draw?: (precentage: number) => void;
    }
    enum ResourceType {
        Texture = 0,
        Audio = 1,
    }
    var noCache: boolean;
    function registerResourceType(extension: string, type: ResourceType): void;
    function preload(rules: PreloadRules, callback: () => void): void;
    function unload(): void;
    function getTexture(filename: string, callback?: () => void): HTMLImageElement;
    function getSound(filename: string, callback?: () => void): HTMLAudioElement;
    function playSound(filename: string, volume?: number): void;
    function playMusic(filename: string): void;
}
