/*
 *  timer.ts
 *  Nifty HTML5 Game Engine
 *  Timer
 */

module Nifty.Timer {
    interface TimerInfo {
        event: { (): boolean; };
        startTime?: number;
        time?: number;
    }
    
    var timers: { [key: number]: TimerInfo } = {};
    
    export function nextFrame(callback: () => void): number {
        return add({
            event: () => {
                callback();
                return true;
            }
        });
    }
    
    export function everyFrame(callback: () => boolean): number {
        return add({
            event: callback
        });
    }
    
    export function after(seconds: number, callback: () => void): number {
        return add({
            event: () => {
                callback();
                return true;
            },
            time: seconds
        });
    }
    
    export function every(seconds: number, callback: () => boolean): number {
        return add({
            event: callback,
            startTime: seconds,
            time: seconds
        });
    }
    
    export function cancel(id: number): void {
        delete timers[id];
    }
    
    export function exists(id: number): boolean {
        return timers[id] !== undefined;
    }
    
    export function update(): void {
        for(var i in timers) {
            var timer = timers[i];
            
            timer.time -= settings.timestep;
            if (timer.time > 0)
                continue;
            
            if (timer.event())
                delete timer;
            else
                timer.time = timer.startTime;
        }
    }
    
    function add(info: TimerInfo): number {
        var id = generateId();
        timers[id] = info;
        
        return id;
    }
    
    var timerId = 0;
    function generateId(): number {
        return ++timerId;
    }
}
