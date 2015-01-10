/*
 *  render-target.ts
 *  Nifty HTML5 Game Engine
 *  WebGL Render Target
 */

/// <reference path="../../lib/jquery-1.11.1.d.ts" />
/// <reference path="shader.ts" />
/// <reference path="view.ts" />
/// <reference path="../color.ts" />

module Nifty {
    export var canvas: HTMLCanvasElement = null;
    export var gl: WebGLRenderingContext = null;
    export var shader: WebGLShader = null;
    export var backBufferCanvas: HTMLCanvasElement = null;
    export var backBuffer: CanvasRenderingContext2D = null;
    
    var vbo: WebGLBuffer = null;
    var view: View = null;
    
    export function initializeRenderTarget(): void {
        initializeWebGLContext();
        initializeCanvasContext();
        
        // Set initial view
        setView(getDefaultView());
    }
    
    export function clear(color: Color): void {
        var glColor = color.getGlColor();
        gl.clearColor(glColor.r, glColor.g, glColor.b, glColor.a);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    
    export function setView(value: View): void {
        var viewport = value.getViewport();
        Nifty.gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
        
        view = value;
    }
    
    export function getView(): View {
        // We clone the view so that modifications to the returned object do not modify
        // the internal view without reapplying the view to the viewport.
        return view.clone();
    }
    
    export function getDefaultView(): View {
        return new View(new Rect(0, 0, Nifty.canvas.width, Nifty.canvas.height));
    }
    
    function initializeWebGLContext(): void {
        // TODO Create canvas based off of preferences stated in settings object
        canvas = <HTMLCanvasElement> $(settings.canvasElement)[0];
        if (settings.fillWindow) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        // TODO Drivers for WebGL and 2d Canvas
        if (!gl)
            throw 'Cannot initialize webgl context!';

        // TODO This should be split into its own function
        // Create shader
        shader = Shader.loadProgram([
            Shader.createFromScript('2d-vertex-shader'),
            Shader.createFromScript('2d-fragment-shader')
        ]);

        gl.useProgram(shader);
        
        // Create buffer
        vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

        // Position
        var positionLocation = gl.getAttribLocation(shader, 'a_position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 32, 0);

        // Color
        var colorLocation = gl.getAttribLocation(shader, 'a_color');
        gl.enableVertexAttribArray(colorLocation);
        gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 32, 8);
        
        // Texture
        var texCoordLocation = gl.getAttribLocation(shader, 'a_texCoord');
        gl.enableVertexAttribArray(texCoordLocation);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 32, 24);
        
        // Set uniforms
        gl.uniform2f(gl.getUniformLocation(shader, 'u_resolution'), canvas.width, canvas.height);
        gl.uniform1i(gl.getUniformLocation(shader, 'u_image'), 0);

        // Finalize state
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
    
    function initializeCanvasContext(): void {
        // Initialize context for non-WebGL backbuffer
        backBufferCanvas = document.createElement('canvas');
        backBufferCanvas.id = 'backBufferCanvas';
        backBufferCanvas.style.display = 'none';
        document.body.appendChild(backBufferCanvas);

        backBuffer = backBufferCanvas.getContext('2d');
    }
}
