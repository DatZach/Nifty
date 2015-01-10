declare module Nifty.Timer {
    function nextFrame(callback: () => void): number;
    function everyFrame(callback: () => boolean): number;
    function after(seconds: number, callback: () => void): number;
    function every(seconds: number, callback: () => boolean): number;
    function cancel(id: number): void;
    function exists(id: number): boolean;
    function update(): void;
}
