/*
 *  shader.ts
 *  Nifty Video Subsystem
 *  WebGL Shader Utilities
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
