/*
 *  nifty.ts
 *  Nifty HTML5 Game Engine
 */
/// <reference path="lib/jquery-1.11.1.d.ts" />
/// <reference path="system/util.ts" />
/// <reference path="system/point.ts" />
/// <reference path="system/rect.ts" />
/// <reference path="video/backend/render-target.ts" />
/// <reference path="video/tile-map.ts" />
/// <reference path="state.ts" />
/// <reference path="timer.ts" />
var Nifty;
(function (Nifty) {
    Nifty.Version = '0.1.0-alpha';
    Nifty.settings = {
        greet: true,
        canvasElement: '#gameCanvas',
        assetsPath: 'assets',
        texturesPath: 'textures',
        audioPath: 'audio',
        fontPath: 'fonts',
        musicVolume: 0.8,
        soundVolume: 1.0,
        globalVolume: 1.0,
        entityGridSize: 64,
        entityOverscan: 64,
        timestep: 1.0 / 60.0,
        maxUpdatesPerFrame: 5
    };
    Nifty.framerate = 0;
    Nifty.lagging = null;
    var frameTime = 0;
    var lastFrameTime = Date.now();
    var states = [];
    var isFullscreen = false;
    var previousUpdateTime = Date.now();
    var accumulator = 0;
    function initialize() {
        if (Nifty.settings.greet) {
            // TODO Detect video and audio
            console.log('Nifty ' + Nifty.Version + '; Video: WebGL; Audio; WebAudio');
        }
        Nifty.initializeRenderTarget();
        $(document).keydown(function (ev) {
            var key = Nifty.Keyboard._translateKeyCode(ev.which);
            Nifty.Keyboard._setKeyState(key, true);
            dispatchEvent(new Nifty.KeyInputArgs(key, true, ev['ctrlKey'], ev['shiftKey']));
        });
        $(document).keyup(function (ev) {
            var key = Nifty.Keyboard._translateKeyCode(ev.which);
            Nifty.Keyboard._setKeyState(key, false);
            dispatchEvent(new Nifty.KeyInputArgs(key, false, ev['ctrlKey'], ev['shiftKey']));
        });
        $(document).mousedown(function (ev) {
            var button = Nifty.Mouse._translateMouseButton(ev['button']);
            var position = new Nifty.Point(ev['offsetX'], ev['offsetY']);
            Nifty.Mouse._setButtonState(button, true);
            dispatchEvent(new Nifty.MouseButtonInputArgs(button, true, position));
        });
        $(document).mouseup(function (ev) {
            var button = Nifty.Mouse._translateMouseButton(ev['button']);
            var position = new Nifty.Point(ev['offsetX'], ev['offsetY']);
            Nifty.Mouse._setButtonState(button, false);
            Nifty.Mouse._setPosition(position);
            dispatchEvent(new Nifty.MouseButtonInputArgs(button, false, position));
        });
        $(document).mousemove(function (ev) {
            var position = new Nifty.Point(ev['offsetX'], ev['offsetY']);
            Nifty.Mouse._setPosition(position);
            dispatchEvent(new Nifty.MouseMoveInputArgs(position));
        });
    }
    Nifty.initialize = initialize;
    function run() {
        var i;
        // Schedule the next frame
        window.requestAnimationFrame(run);
        var time = (Date.now() - previousUpdateTime) / 1000.0;
        previousUpdateTime = Date.now();
        accumulator += time;
        // Spiral of death fix
        var lagThreshold = Nifty.settings.timestep * Nifty.settings.maxUpdatesPerFrame;
        if (accumulator > lagThreshold) {
            if (Nifty.lagging)
                Nifty.lagging(accumulator - lagThreshold);
            accumulator = lagThreshold;
        }
        while (accumulator >= Nifty.settings.timestep) {
            Nifty.Timer.update();
            for (i = 0; i < states.length; ++i) {
                var state = states[i];
                if (isActive(state) || (state.getInactiveMode() & 2 /* Update */) == 2 /* Update */)
                    state.updateInternal();
            }
            accumulator -= Nifty.settings.timestep;
        }
        // Find bottom-most state that renders. This will provide the color to clear.
        var clearState = null;
        for (i = 0; i < states.length; ++i) {
            var state = states[i];
            if (isActive(state) || (state.getInactiveMode() & 4 /* Draw */) == 4 /* Draw */) {
                clearState = state;
                break;
            }
        }
        for (i = 0; i < states.length; ++i) {
            var state = states[i];
            // Clear canvas
            if (state == clearState)
                Nifty.clear(state.getClearColor());
            // Draw active states
            if (!isActive(state) && (state.getInactiveMode() & 4 /* Draw */) != 4 /* Draw */)
                continue;
            state.drawInternal();
        }
        // Calculate framerate
        var currentFrameTime = 1000.0 / ((frameTime = Date.now()) - lastFrameTime);
        if (frameTime != lastFrameTime) {
            Nifty.framerate += (currentFrameTime - Nifty.framerate) / 50;
            lastFrameTime = frameTime;
        }
    }
    Nifty.run = run;
    function pushState(state) {
        Nifty.Assets.preload(state.preload(), function () {
            states.push(state);
            state.initializeCamera();
            state.enter();
        });
    }
    Nifty.pushState = pushState;
    function popState() {
        states[states.length - 1].leave();
        states.pop();
        Nifty.Assets.unload();
    }
    Nifty.popState = popState;
    function setState(state) {
        while (states.length > 0)
            popState();
        pushState(state);
    }
    Nifty.setState = setState;
    function setFullscreen(value) {
        if (value) {
            setTimeout(function () {
                Nifty.canvas.width = $(window).width();
                Nifty.canvas.height = $(window).height();
                if (Nifty.canvas['requestFullscreen'])
                    Nifty.canvas['requestFullscreen']();
                else if (Nifty.canvas['msRequestFullscreen'])
                    Nifty.canvas['requestFullscreen']();
                else if (Nifty.canvas['webkitRequestFullscreen'])
                    Nifty.canvas['webkitRequestFullscreen'](Element['ALLOW_KEYBOARD_INPUT']);
                else if (Nifty.canvas['mozRequestFullscreen'])
                    Nifty.canvas['mozRequestFullscreen']();
            }, 1);
        }
        else {
        }
        isFullscreen = value;
    }
    Nifty.setFullscreen = setFullscreen;
    function dispatchEvent(args) {
        for (var i = states.length - 1; i >= 0; --i) {
            var state = states[i];
            if ((isActive(state) || (state.getInactiveMode() & 1 /* Input */) == 1 /* Input */) && state.processEvent(args) == 0 /* Block */)
                return;
        }
    }
    function isActive(state) {
        if (state.getIsOverlay())
            return states.indexOf(state) == states.length - 1;
        var lastOverlay = null;
        for (var i = 0; i < states.length; ++i) {
            var state = states[i];
            if (!state.getIsOverlay())
                lastOverlay = state;
        }
        return lastOverlay == state;
    }
})(Nifty || (Nifty = {}));
