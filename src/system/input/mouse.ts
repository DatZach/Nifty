/*
 *  mouse.ts
 *  Nifty HTML5 Game Engine
 *  Mouse Input Manager
 */

module Nifty {
    export class Mouse {
        private static mouseButtonLookup = {
            0: Button.Left,
            1: Button.Middle,
            2: Button.Right
        };
        
        private static mouseButtonState: { [button: number]: boolean; } = {};
        private static mousePosition: Point = new Point();
        
        public static isButtonPressed(button: Button): boolean {
            return this.mouseButtonState[button] || false;
        }
        
        public static getPosition(): Point {
            return this.mousePosition;
        }

        // Internal use
        public static _translateMouseButton(button: number): Button {
            return this.mouseButtonLookup[button] || Button.Unknown;
        }
        
        public static _setButtonState(button: Button, value: boolean): void {
            this.mouseButtonState[button] = value;
        }
        
        public static _setPosition(point: Point): void {
            this.mousePosition = point;
        }
    }
    
    export enum Button {
        Unknown,
        Left,
        Right,
        Middle
    }
}
