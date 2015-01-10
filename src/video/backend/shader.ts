/*
 *  shader.ts
 *  Nifty Video Subsystem
 *  WebGL Shader Utilities
 */

/**
 *  Default Shaders
 
    <!-- Shaders -->
    <script id="2d-vertex-shader" type="x-shader/x-vertex">
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        attribute vec4 a_color;
        uniform vec2 u_resolution;
        varying vec2 v_texCoord;
        varying vec4 v_color;

        void main() {
            vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;
            gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
            v_texCoord = a_texCoord;
            v_color = a_color;
        }
    </script>

    <script id="2d-fragment-shader" type="x-shader/x-fragment">
        precision mediump float;

        uniform sampler2D u_image;
        varying vec2 v_texCoord;
        varying vec4 v_color;

        void main() {
            gl_FragColor = v_texCoord.x < 0.0 ? v_color : texture2D(u_image, v_texCoord) * v_color;
        }
    </script>

 */

// TODO Rewrite this as a class instead of a module
module Nifty.Shader {
    export function loadShader(source: string, type: number): WebGLShader {
        // Create and compile shader
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        // Check the compile status
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('loadShader(): Error compiling shader \'' + shader + '\': ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            
            return null;
        }
        
        return shader;
    }
    
    export function loadProgram(shaders: WebGLShader[]): WebGLProgram {
        var program = gl.createProgram();
        
        for(var i = 0; i < shaders.length; ++i)
            gl.attachShader(program, shaders[i]);
        
        gl.linkProgram(program);
        
        // Check the link status
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('loadProgram(): Error in program linking: ' + gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            
            return null;
        }
        
        return program;
    }
    
    export function createFromScript(id: string): WebGLShader {
        var element = <HTMLScriptElement> document.getElementById(id);
        if (!element)
            throw ('createFromScript(): Unknown script element \'' + id + '\'');
        
        var source = element.text;
        var type;
        
        if (element.type == 'x-shader/x-vertex')
            type = gl.VERTEX_SHADER;
        else if (element.type == 'x-shader/x-fragment')
            type = gl.FRAGMENT_SHADER;
        else
            throw 'createFromScript(): Unknown shader type';
        
        return loadShader(source, type);
    }
}
