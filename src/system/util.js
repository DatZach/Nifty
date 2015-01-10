/*
 *  util.js
 *  Nifty System
 *  Utilities
 */
/// <reference path="point.ts" />
var Nifty;
(function (Nifty) {
    var Util;
    (function (Util) {
        /**
         *  Joins path fragments together to form a *NIX path.
         *  @param {...string[]} segments - Path segments
         *  @return {string} Joined path
         */
        function joinPath() {
            var segments = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                segments[_i - 0] = arguments[_i];
            }
            var i, parts = [];
            for (i = 0; i < segments.length; ++i)
                parts = parts.concat(segments[i].split('/'));
            // Interpret the path commands to get the new resolved path
            var newParts = [];
            for (i = 0; i < parts.length; ++i) {
                var part = parts[i];
                // Remove leading and trailing slashes and '.'s
                if (!part || part == '.')
                    continue;
                // Interpret '..'
                if (part == '..')
                    newParts.pop();
                else
                    newParts.push(part);
            }
            // Preserve initial slash if there was one
            if (parts[0] == '')
                newParts.unshift('');
            return newParts.join('/') || (newParts.length ? '/' : '.');
        }
        Util.joinPath = joinPath;
        function getFilename(path) {
            return path.split(/(\\|\/)/g).pop() || '';
        }
        Util.getFilename = getFilename;
        function getExtension(path) {
            return (path.split(/(?:\.([^.]+))?$/)[1] || '').toLowerCase();
        }
        Util.getExtension = getExtension;
        function lerp(a, b, w) {
            return a + w * (b - a);
        }
        Util.lerp = lerp;
        function rlerp(a, b, c) {
            return (c - a) / (b - a);
        }
        Util.rlerp = rlerp;
        function clamp(value, min, max) {
            return value < min ? min : (value > max ? max : value);
        }
        Util.clamp = clamp;
        function toDegrees(dir) {
            return dir * (180.0 / Math.PI);
        }
        Util.toDegrees = toDegrees;
        function toRadians(dir) {
            return dir * (Math.PI / 180.0);
        }
        Util.toRadians = toRadians;
        function direction(p1, p2) {
            var r = Math.atan2(p1.y - p2.y, p2.x - p1.x);
            return r < 0 ? r + 2.0 * Math.PI : r;
        }
        Util.direction = direction;
        function distance(p1, p2) {
            return Math.sqrt(((p2.x - p1.x) * (p2.x - p1.x)) + ((p2.y - p1.y) * (p2.y - p1.y)));
        }
        Util.distance = distance;
        function lengthDir(len, dir) {
            return new Nifty.Point(Math.cos(dir) * len, -Math.sin(dir) * len);
        }
        Util.lengthDir = lengthDir;
        function roundToNearest(value, factor) {
            return Math.round(value / factor) * factor;
        }
        Util.roundToNearest = roundToNearest;
    })(Util = Nifty.Util || (Nifty.Util = {}));
})(Nifty || (Nifty = {}));
// requestAnimationFrame() polyfill
// https://gist.github.com/paulirish/1579671
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { return callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) { return clearTimeout(id); };
})();
