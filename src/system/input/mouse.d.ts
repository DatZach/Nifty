declare module Nifty {
    class Mouse {
        private static mouseButtonLookup;
        private static mouseButtonState;
        private static mousePosition;
        static isButtonPressed(button: Button): boolean;
        static getPosition(): Point;
        static _translateMouseButton(button: number): Button;
        static _setButtonState(button: Button, value: boolean): void;
        static _setPosition(point: Point): void;
    }
    enum Button {
        Unknown = 0,
        Left = 1,
        Right = 2,
        Middle = 3,
    }
}
