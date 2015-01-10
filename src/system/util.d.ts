/// <reference path="point.d.ts" />
declare module Nifty.Util {
    /**
     *  Joins path fragments together to form a *NIX path.
     *  @param {...string[]} segments - Path segments
     *  @return {string} Joined path
     */
    function joinPath(...segments: string[]): string;
    function getFilename(path: string): string;
    function getExtension(path: string): string;
    function lerp(a: number, b: number, w: number): number;
    function rlerp(a: number, b: number, c: number): number;
    function clamp(value: number, min: number, max: number): number;
    function toDegrees(dir: number): number;
    function toRadians(dir: number): number;
    function direction(p1: Point, p2: Point): number;
    function distance(p1: Point, p2: Point): number;
    function lengthDir(len: number, dir: number): Point;
    function roundToNearest(value: number, factor: number): number;
}
