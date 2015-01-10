/*
 *  asset-manager.ts
 *  Nifty HTML5 Game Engine
 *  Asset Manager
 */

/// <reference path="system/util.ts" />
/// <reference path="video/rectangle-shape.ts" />

module Nifty.Assets {
    export interface PreloadRules {
        assets: string[];
        draw?: (precentage: number) => void;
    }
    
    export enum ResourceType {
        Texture,
        Audio
    };
    
    export var noCache: boolean = false;
    var textures: { [key: string]: HTMLImageElement } = { };
    var sounds: { [key: string]: HTMLAudioElement } = { };
    var currentMusic: HTMLAudioElement = null;
    var resourceTypes = {
        // Textures
        'png': ResourceType.Texture,
        'jpg': ResourceType.Texture,
        'svg': ResourceType.Texture,
        'gif': ResourceType.Texture,
        'bmp': ResourceType.Texture,
        'apng': ResourceType.Texture,
        'jpeg': ResourceType.Texture,
        'tiff': ResourceType.Texture,

        // Sounds
        'wav': ResourceType.Audio,

        // Music
        'mp3': ResourceType.Audio,
        'ogg': ResourceType.Audio
    };
    
    export function registerResourceType(extension: string, type: ResourceType): void {
        resourceTypes[extension] = type;
    }

    export function preload(rules: PreloadRules, callback: () => void): void {
        var loadEvent = () => {
            // Loading screen
            var percentage = (rules.assets.length - --remaining) / rules.assets.length;
            if (rules.draw)
                rules.draw(percentage);
            else {
                var padding = Math.floor(Nifty.canvas.width * 0.33);
                
                var rect = new Nifty.RectangleShape();
                    rect.position.x = padding;
                    rect.position.y = Math.floor(Nifty.canvas.height / 2) - 4;
                    rect.size.x = Math.floor((Nifty.canvas.width - padding * 2) * percentage);
                    rect.size.y = 8;
                    rect.color = Colors.white.clone();
                rect.draw();
            }

            // Call whatever is requested after we finish loading
            if (remaining <= 0) {
                if (callback)
                    callback();
            }
        };
        
        var remaining = rules.assets.length;
        if (remaining === 0)
            callback();
        else {
            for(var i = 0; i < rules.assets.length; ++i) {
                var path = rules.assets[i];

                switch(resourceTypes[Util.getExtension(path)]) {
                    case ResourceType.Texture:
                        getTexture(path, loadEvent);
                        break;

                    case ResourceType.Audio:
                        getSound(path, loadEvent);
                        break;

                    default:
                        console.warn('Unknown resource type!');
                        break;
                }
            }
        }
    }

    export function unload(): void {
        // Free textures
        for(var p in textures)
            delete textures[p];
        
        // Free sounds
        for(var p in sounds)
            delete sounds[p];
    }

    export function getTexture(filename: string, callback?: () => void): HTMLImageElement {
        // Keys are just the filename
        var key = filename.toLowerCase();

        // If the image is not loaded into the cache, load it
        if (!(key in textures)) {
            var asset = new Image();
            asset.src = resolveResourcePath(filename);
            asset.onload = callback;

            textures[key] = asset;
        }
        else if (callback)
            callback();

        return textures[key];
    }

    export function getSound(filename: string, callback?: () => void): HTMLAudioElement {
        // Keys are just the filename
        var key = filename.toLowerCase();

        // If the sound is not loaded into the cache, load it
        if (!(key in sounds)) {
            var path = resolveResourcePath(filename);
            var asset = new Audio(path);
            asset.oncanplaythrough = callback;

            sounds[key] = asset;
        }
        else if (callback)
            callback();

        return sounds[key];
    }

    export function playSound(filename: string, volume?: number): void {
        getSound(filename, () => {
            var sound = new Audio(sounds[filename.toLowerCase()].src);
            sound.volume = (volume || settings.soundVolume) * settings.globalVolume;
            sound.play();
        });
    }

    export function playMusic(filename: string): void {
        getSound(filename, () => {
            var music = new Audio(sounds[filename.toLowerCase()].src);
            music.volume = settings.musicVolume * settings.globalVolume;
            music.play();

            if (currentMusic != null) {
                currentMusic.pause();
                currentMusic = null;
            }

            currentMusic = music;
        });
    }
    
    function resolveResourcePath(filename: string): string {
        var ext = Util.getExtension(filename);

        // We evaluate the path here so that we can allow developers to change their directories
        var subPaths = { };
        subPaths[ResourceType.Texture] = settings.texturesPath;
        subPaths[ResourceType.Audio] = settings.audioPath;
 
        var path = Util.joinPath(settings.assetsPath, subPaths[resourceTypes[ext]] || 'unknown-resource-type', filename);
        if (noCache)
            path += '?c=' + createCacheString();
        
        return path;
    }
    
    function createCacheString(): string {
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        
        for(var i = 0; i < 16; ++i)
            result += possible.charAt(Math.floor(Math.random() * possible.length));
        
        return result;
    }
}
