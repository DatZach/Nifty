declare module Nifty.Shader {
    function loadShader(source: string, type: number): WebGLShader;
    function loadProgram(shaders: WebGLShader[]): WebGLProgram;
    function createFromScript(id: string): WebGLShader;
}
