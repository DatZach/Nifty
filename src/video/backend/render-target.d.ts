/// <reference path="../../lib/jquery-1.11.1.d.ts" />
/// <reference path="shader.d.ts" />
/// <reference path="view.d.ts" />
/// <reference path="../color.d.ts" />
declare module Nifty {
    var canvas: HTMLCanvasElement;
    var gl: WebGLRenderingContext;
    var shader: WebGLShader;
    var backBufferCanvas: HTMLCanvasElement;
    var backBuffer: CanvasRenderingContext2D;
    function initializeRenderTarget(): void;
    function clear(color: Color): void;
    function setView(value: View): void;
    function getView(): View;
    function getDefaultView(): View;
}
