/*
 *  asset-manager.ts
 *  Nifty HTML5 Game Engine
 *  Asset Manager
 */
/// <reference path="system/util.ts" />
/// <reference path="video/rectangle-shape.ts" />
var Nifty;
(function (Nifty) {
    var Assets;
    (function (Assets) {
        (function (ResourceType) {
            ResourceType[ResourceType["Texture"] = 0] = "Texture";
            ResourceType[ResourceType["Audio"] = 1] = "Audio";
        })(Assets.ResourceType || (Assets.ResourceType = {}));
        var ResourceType = Assets.ResourceType;
        ;
        Assets.noCache = false;
        var textures = {};
        var sounds = {};
        var currentMusic = null;
        var resourceTypes = {
            // Textures
            'png': 0 /* Texture */,
            'jpg': 0 /* Texture */,
            'svg': 0 /* Texture */,
            'gif': 0 /* Texture */,
            'bmp': 0 /* Texture */,
            'apng': 0 /* Texture */,
            'jpeg': 0 /* Texture */,
            'tiff': 0 /* Texture */,
            // Sounds
            'wav': 1 /* Audio */,
            // Music
            'mp3': 1 /* Audio */,
            'ogg': 1 /* Audio */
        };
        function registerResourceType(extension, type) {
            resourceTypes[extension] = type;
        }
        Assets.registerResourceType = registerResourceType;
        function preload(rules, callback) {
            var loadEvent = function () {
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
                    rect.color = Nifty.Colors.white.clone();
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
                for (var i = 0; i < rules.assets.length; ++i) {
                    var path = rules.assets[i];
                    switch (resourceTypes[Nifty.Util.getExtension(path)]) {
                        case 0 /* Texture */:
                            getTexture(path, loadEvent);
                            break;
                        case 1 /* Audio */:
                            getSound(path, loadEvent);
                            break;
                        default:
                            console.warn('Unknown resource type!');
                            break;
                    }
                }
            }
        }
        Assets.preload = preload;
        function unload() {
            for (var p in textures)
                delete textures[p];
            for (var p in sounds)
                delete sounds[p];
        }
        Assets.unload = unload;
        function getTexture(filename, callback) {
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
        Assets.getTexture = getTexture;
        function getSound(filename, callback) {
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
        Assets.getSound = getSound;
        function playSound(filename, volume) {
            getSound(filename, function () {
                var sound = new Audio(sounds[filename.toLowerCase()].src);
                sound.volume = (volume || Nifty.settings.soundVolume) * Nifty.settings.globalVolume;
                sound.play();
            });
        }
        Assets.playSound = playSound;
        function playMusic(filename) {
            getSound(filename, function () {
                var music = new Audio(sounds[filename.toLowerCase()].src);
                music.volume = Nifty.settings.musicVolume * Nifty.settings.globalVolume;
                music.play();
                if (currentMusic != null) {
                    currentMusic.pause();
                    currentMusic = null;
                }
                currentMusic = music;
            });
        }
        Assets.playMusic = playMusic;
        function resolveResourcePath(filename) {
            var ext = Nifty.Util.getExtension(filename);
            // We evaluate the path here so that we can allow developers to change their directories
            var subPaths = {};
            subPaths[0 /* Texture */] = Nifty.settings.texturesPath;
            subPaths[1 /* Audio */] = Nifty.settings.audioPath;
            var path = Nifty.Util.joinPath(Nifty.settings.assetsPath, subPaths[resourceTypes[ext]] || 'unknown-resource-type', filename);
            if (Assets.noCache)
                path += '?c=' + createCacheString();
            return path;
        }
        function createCacheString() {
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var result = '';
            for (var i = 0; i < 16; ++i)
                result += possible.charAt(Math.floor(Math.random() * possible.length));
            return result;
        }
    })(Assets = Nifty.Assets || (Nifty.Assets = {}));
})(Nifty || (Nifty = {}));
