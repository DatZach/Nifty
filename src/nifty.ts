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

module Nifty {
    export var Version = '0.1.0-alpha';
    
    export var settings = {
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
    
    export var framerate: number = 0;
    export var lagging: (delta) => void = null;
    
    var frameTime: number = 0;
    var lastFrameTime: number = Date.now();
    var states: State[] = [];
    var isFullscreen: boolean = false;
    var previousUpdateTime: number = Date.now();
    var accumulator: number = 0;

    export function initialize(): void {
        if (settings.greet) {
            // TODO Detect video and audio
            console.log('Nifty ' + Version + '; Video: WebGL; Audio; WebAudio');
        }
        
        initializeRenderTarget();
        
        $(document).keydown(ev => {
            var key = Keyboard._translateKeyCode(ev.which);
            
            Keyboard._setKeyState(key, true);
            dispatchEvent(new KeyInputArgs(key, true, ev['ctrlKey'], ev['shiftKey']));
        });
        
        $(document).keyup(ev => {
            var key = Keyboard._translateKeyCode(ev.which);
            
            Keyboard._setKeyState(key, false);
            dispatchEvent(new KeyInputArgs(key, false, ev['ctrlKey'], ev['shiftKey']));
        });
        
        $(document).mousedown(ev => {
            var button = Mouse._translateMouseButton(ev['button']);
            var position = new Point(ev['offsetX'], ev['offsetY']);
            
            Mouse._setButtonState(button, true);
            dispatchEvent(new MouseButtonInputArgs(button, true, position));
        });
        
        $(document).mouseup(ev => {
            var button = Mouse._translateMouseButton(ev['button']);
            var position = new Point(ev['offsetX'], ev['offsetY']);
            
            Mouse._setButtonState(button, false);
            Mouse._setPosition(position); 
            dispatchEvent(new MouseButtonInputArgs(button, false, position));
        });
        
        $(document).mousemove(ev => {
            var position = new Point(ev['offsetX'], ev['offsetY']);
            
            Mouse._setPosition(position);
            dispatchEvent(new MouseMoveInputArgs(position));
        });
    }

    export function run(): void {
        var i: number;
        
        // Schedule the next frame
        window.requestAnimationFrame(run);
        
        var time = (Date.now() - previousUpdateTime) / 1000.0;
        previousUpdateTime = Date.now();
        accumulator += time;
        
        // Spiral of death fix
        var lagThreshold = settings.timestep * settings.maxUpdatesPerFrame;
        if (accumulator > lagThreshold) {
            if (lagging)
                lagging(accumulator - lagThreshold);
            
            accumulator = lagThreshold;
        }

        // Update
        while(accumulator >= settings.timestep) {
            Timer.update();

            for(i = 0; i < states.length; ++i) {
                var state = states[i];

                if (isActive(state) || (state.getInactiveMode() & UpdateMode.Update) == UpdateMode.Update)
                    state.updateInternal();
            }
            
            accumulator -= settings.timestep;
        }
        
        // Find bottom-most state that renders. This will provide the color to clear.
        var clearState: State = null;
        for(i = 0; i < states.length; ++i) {
            var state = states[i];
            
            if (isActive(state) || (state.getInactiveMode() & UpdateMode.Draw) == UpdateMode.Draw) {
                clearState = state;
                break;
            }
        }
        
        // Draw
        for(i = 0; i < states.length; ++i) {
            var state = states[i];
            
            // Clear canvas
            if (state == clearState)
                clear(state.getClearColor());
            
            // Draw active states
            if (!isActive(state) && (state.getInactiveMode() & UpdateMode.Draw) != UpdateMode.Draw)
                continue;
            
            state.drawInternal();
        }
        
        // Calculate framerate
        var currentFrameTime: number = 1000.0 / ((frameTime = Date.now()) - lastFrameTime);
        if (frameTime != lastFrameTime) {
            framerate += (currentFrameTime - framerate) / 50;
            lastFrameTime = frameTime;
        }
    }

    export function pushState(state: State): void {
        Assets.preload(state.preload(), () => {
            states.push(state);
            state.initializeCamera();
            state.enter();
        });
    }

    export function popState(): void {
        states[states.length - 1].leave();
        states.pop();
        
        Assets.unload();
    }

    export function setState(state: State): void {
        while(states.length > 0)
            popState();

        pushState(state);
    }
    
    export function setFullscreen(value: boolean): void {
        if (value) {
            setTimeout(
                () => {
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
                },
                1
            );
        }
        else {
            
        }
        
        isFullscreen = value;
    }
    
    function dispatchEvent(args: Object): void {
        for(var i = states.length - 1; i >= 0; --i) {
            var state = states[i];
            
            if ((isActive(state) || (state.getInactiveMode() & UpdateMode.Input) == UpdateMode.Input) &&
                state.processEvent(args) == EventResult.Block)
                return;
        }
    }
    
    function isActive(state: State): boolean {
        if (state.getIsOverlay())
            return states.indexOf(state) == states.length - 1;
        
        var lastOverlay: State = null;
        for(var i = 0; i < states.length; ++i) {
            var state = states[i];
            
            if (!state.getIsOverlay())
                lastOverlay = state;
        }
        
        return lastOverlay == state;
    }
}
