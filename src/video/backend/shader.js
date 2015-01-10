/*
 *  shader.ts
 *  Nifty Video Subsystem
 *  WebGL Shader Utilities
 */
// TODO Rewrite this as a class instead of a module
var Nifty;
(function (Nifty) {
    var Shader;
    (function (Shader) {
        function loadShader(source, type) {
            // Create and compile shader
            var shader = Nifty.gl.createShader(type);
            Nifty.gl.shaderSource(shader, source);
            Nifty.gl.compileShader(shader);
            // Check the compile status
            if (!Nifty.gl.getShaderParameter(shader, Nifty.gl.COMPILE_STATUS)) {
                console.error('loadShader(): Error compiling shader \'' + shader + '\': ' + Nifty.gl.getShaderInfoLog(shader));
                Nifty.gl.deleteShader(shader);
                return null;
            }
            return shader;
        }
        Shader.loadShader = loadShader;
        function loadProgram(shaders) {
            var program = Nifty.gl.createProgram();
            for (var i = 0; i < shaders.length; ++i)
                Nifty.gl.attachShader(program, shaders[i]);
            Nifty.gl.linkProgram(program);
            // Check the link status
            if (!Nifty.gl.getProgramParameter(program, Nifty.gl.LINK_STATUS)) {
                console.error('loadProgram(): Error in program linking: ' + Nifty.gl.getProgramInfoLog(program));
                Nifty.gl.deleteProgram(program);
                return null;
            }
            return program;
        }
        Shader.loadProgram = loadProgram;
        function createFromScript(id) {
            var element = document.getElementById(id);
            if (!element)
                throw ('createFromScript(): Unknown script element \'' + id + '\'');
            var source = element.text;
            var type;
            if (element.type == 'x-shader/x-vertex')
                type = Nifty.gl.VERTEX_SHADER;
            else if (element.type == 'x-shader/x-fragment')
                type = Nifty.gl.FRAGMENT_SHADER;
            else
                throw 'createFromScript(): Unknown shader type';
            return loadShader(source, type);
        }
        Shader.createFromScript = createFromScript;
    })(Shader = Nifty.Shader || (Nifty.Shader = {}));
})(Nifty || (Nifty = {}));
