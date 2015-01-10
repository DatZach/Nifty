/*
 *  util.js
 *  Nifty System
 *  Utilities
 */

/// <reference path="point.ts" />

module Nifty.Util {
    /**
     *  Joins path fragments together to form a *NIX path.
     *  @param {...string[]} segments - Path segments
     *  @return {string} Joined path
     */
    export function joinPath(...segments: string[]): string {
        var i, parts = [];
        for(i = 0; i < segments.length; ++i)
            parts = parts.concat(segments[i].split('/'));

        // Interpret the path commands to get the new resolved path
        var newParts = [];
        for(i = 0; i < parts.length; ++i) {
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
    
    export function getFilename(path: string): string {
        return path.split(/(\\|\/)/g).pop() || '';
    }

    export function getExtension(path: string): string {
        return (path.split(/(?:\.([^.]+))?$/)[1] || '').toLowerCase();
    }
    
    export function lerp(a: number, b: number, w: number): number {
        return a + w * (b - a);
    }
    
    export function rlerp(a: number, b: number, c: number): number {
        return (c - a) / (b - a);
    }
    
    export function clamp(value: number, min: number, max: number): number {
        return value < min ? min : (value > max ? max : value);
    }
    
    export function toDegrees(dir: number): number {
        return dir * (180.0 / Math.PI);
    }
    
    export function toRadians(dir: number): number {
        return dir * (Math.PI / 180.0);
    }
    
    export function direction(p1: Point, p2: Point) {
        var r = Math.atan2(p1.y - p2.y, p2.x - p1.x);
        return r < 0 ? r + 2.0 * Math.PI : r;
    }
    
    export function distance(p1: Point, p2: Point) {
        return Math.sqrt(((p2.x - p1.x) * (p2.x - p1.x)) + ((p2.y - p1.y) * (p2.y - p1.y)));
    }
    
    export function lengthDir(len: number, dir: number): Point {
        return new Point(
             Math.cos(dir) * len,
            -Math.sin(dir) * len
        );
    }
    
    export function roundToNearest(value: number, factor: number): number {
        return Math.round(value / factor) * factor;
    }
}

// requestAnimationFrame() polyfill
// https://gist.github.com/paulirish/1579671
(() => {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (callback, element?) => {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(() => callback(currTime + timeToCall), timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = id => clearTimeout(id);
})();
