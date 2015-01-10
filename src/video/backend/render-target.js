/*
 *  render-target.ts
 *  Nifty HTML5 Game Engine
 *  WebGL Render Target
 */
/// <reference path="../../lib/jquery-1.11.1.d.ts" />
/// <reference path="shader.ts" />
/// <reference path="view.ts" />
/// <reference path="../color.ts" />
var Nifty;
(function (Nifty) {
    Nifty.canvas = null;
    Nifty.gl = null;
    Nifty.shader = null;
    Nifty.backBufferCanvas = null;
    Nifty.backBuffer = null;
    var vbo = null;
    var view = null;
    function initializeRenderTarget() {
        initializeWebGLContext();
        initializeCanvasContext();
        // Set initial view
        setView(getDefaultView());
    }
    Nifty.initializeRenderTarget = initializeRenderTarget;
    function clear(color) {
        var glColor = color.getGlColor();
        Nifty.gl.clearColor(glColor.r, glColor.g, glColor.b, glColor.a);
        Nifty.gl.clear(Nifty.gl.COLOR_BUFFER_BIT);
    }
    Nifty.clear = clear;
    function setView(value) {
        var viewport = value.getViewport();
        Nifty.gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
        view = value;
    }
    Nifty.setView = setView;
    function getView() {
        // We clone the view so that modifications to the returned object do not modify
        // the internal view without reapplying the view to the viewport.
        return view.clone();
    }
    Nifty.getView = getView;
    function getDefaultView() {
        return new Nifty.View(new Nifty.Rect(0, 0, Nifty.canvas.width, Nifty.canvas.height));
    }
    Nifty.getDefaultView = getDefaultView;
    function initializeWebGLContext() {
        // TODO Create canvas based off of preferences stated in settings object
        Nifty.canvas = $(Nifty.settings.canvasElement)[0];
        Nifty.gl = Nifty.canvas.getContext('webgl') || Nifty.canvas.getContext('experimental-webgl');
        // TODO Drivers for WebGL and 2d Canvas
        if (!Nifty.gl)
            throw 'Cannot initialize webgl context!';
        // TODO This should be split into its own function
        // Create shader
        Nifty.shader = Nifty.Shader.loadProgram([
            Nifty.Shader.createFromScript('2d-vertex-shader'),
            Nifty.Shader.createFromScript('2d-fragment-shader')
        ]);
        Nifty.gl.useProgram(Nifty.shader);
        // Create buffer
        vbo = Nifty.gl.createBuffer();
        Nifty.gl.bindBuffer(Nifty.gl.ARRAY_BUFFER, vbo);
        // Position
        var positionLocation = Nifty.gl.getAttribLocation(Nifty.shader, 'a_position');
        Nifty.gl.enableVertexAttribArray(positionLocation);
        Nifty.gl.vertexAttribPointer(positionLocation, 2, Nifty.gl.FLOAT, false, 32, 0);
        // Color
        var colorLocation = Nifty.gl.getAttribLocation(Nifty.shader, 'a_color');
        Nifty.gl.enableVertexAttribArray(colorLocation);
        Nifty.gl.vertexAttribPointer(colorLocation, 4, Nifty.gl.FLOAT, false, 32, 8);
        // Texture
        var texCoordLocation = Nifty.gl.getAttribLocation(Nifty.shader, 'a_texCoord');
        Nifty.gl.enableVertexAttribArray(texCoordLocation);
        Nifty.gl.vertexAttribPointer(texCoordLocation, 2, Nifty.gl.FLOAT, false, 32, 24);
        // Set uniforms
        Nifty.gl.uniform2f(Nifty.gl.getUniformLocation(Nifty.shader, 'u_resolution'), Nifty.canvas.width, Nifty.canvas.height);
        Nifty.gl.uniform1i(Nifty.gl.getUniformLocation(Nifty.shader, 'u_image'), 0);
        // Finalize state
        Nifty.gl.enable(Nifty.gl.BLEND);
        Nifty.gl.blendFunc(Nifty.gl.SRC_ALPHA, Nifty.gl.ONE_MINUS_SRC_ALPHA);
    }
    function initializeCanvasContext() {
        // Initialize context for non-WebGL backbuffer
        Nifty.backBufferCanvas = document.createElement('canvas');
        Nifty.backBufferCanvas.id = 'backBufferCanvas';
        Nifty.backBufferCanvas.style.display = 'none';
        document.body.appendChild(Nifty.backBufferCanvas);
        Nifty.backBuffer = Nifty.backBufferCanvas.getContext('2d');
    }
})(Nifty || (Nifty = {}));
