/*
 *  input.ts
 *  Nifty HTML5 Game Engine
 *  Input Manager
 */

/// <reference path="system/input/keyboard.ts" />
/// <reference path="system/input/mouse.ts" />

module Nifty {
    export enum EventResult {
        Block,
        Continue
    }
    
    export class KeyInputArgs {
        constructor(private fKey: Key,
                    private fPressed: boolean,
                    private fControl: boolean,
                    private fShift: boolean) {

        }
        
        public key(): Key {
            return this.fKey;
        }
        
        public pressed(): boolean {
            return this.fPressed;
        }
        
        public control(): boolean {
            return this.fControl;
        }
        
        public shift(): boolean {
            return this.fShift;
        }
    }
    
    export class TextInputArgs {
        constructor(private fText: string) {
            
        }
        
        public text(): string {
            return this.fText;
        }
    }
    
    export class MouseButtonInputArgs {
        constructor(private fButton: Button,
                    private fPressed: boolean,
                    private fPosition: Point) {

        }
        
        public button(): Button {
            return this.fButton;
        }
        
        public pressed(): boolean {
            return this.fPressed;
        }
        
        public position(): Point {
            return this.fPosition;
        }
    }
    
    export class MouseWheelInputArgs {
        constructor(private fDelta: number,
                    private fPosition: Point) {
        }
        
        public delta(): number {
            return this.fDelta;
        }
        
        public position(): Point {
            return this.fPosition;
        }
    }
    
    export class MouseMoveInputArgs {
        constructor(private position: Point) {
            
        }
    }
    
    export class Input {
        // TODO These should allow for multiple subscriptions
        //      private keys: { [key: number]: { (args: KeyInputArgs): boolean; }[] } = {};
        public key: { (args: KeyInputArgs): EventResult; }[] = [];
        public mouseButton: { (args: MouseButtonInputArgs): EventResult; }[] = [];
        public text: { (args: TextInputArgs): EventResult; } = null;
        public mouseWheel: { (args: MouseWheelEvent): EventResult; } = null;
        public mouseMove: { (args: MouseMoveInputArgs): EventResult; } = null;
        
        public processInput(args: Object): EventResult {
            if (args instanceof KeyInputArgs) {
                var kArgs = <KeyInputArgs> args;

                if (this.key[kArgs.key()] !== undefined)
                    return this.key[kArgs.key()](kArgs);
            }
            else if (args instanceof TextInputArgs) {
                var tArgs = <TextInputArgs> args;
                
                if (this.text !== null)
                    return this.text(tArgs);
            }
            else if (args instanceof MouseMoveInputArgs) {
                var mmArgs = <MouseMoveInputArgs> args;
                
                if (this.mouseMove !== null)
                    return this.mouseMove(mmArgs);
            }
            else if (args instanceof MouseButtonInputArgs) {
                var mbArgs = <MouseButtonInputArgs> args;
                
                if (this.mouseButton[mbArgs.button()] !== undefined)
                    return this.mouseButton[mbArgs.button()](mbArgs);
            }
            else if (args instanceof MouseWheelInputArgs) {
                var mwArgs = <MouseWheelEvent> args;
                
                if (this.mouseWheel !== null)
                    return this.mouseWheel(mwArgs);
            }
            
            return EventResult.Block;
        }
    }
}
