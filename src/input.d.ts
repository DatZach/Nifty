/// <reference path="system/input/keyboard.d.ts" />
/// <reference path="system/input/mouse.d.ts" />
declare module Nifty {
    enum EventResult {
        Block = 0,
        Continue = 1,
    }
    class KeyInputArgs {
        private fKey;
        private fPressed;
        private fControl;
        private fShift;
        constructor(fKey: Key, fPressed: boolean, fControl: boolean, fShift: boolean);
        key(): Key;
        pressed(): boolean;
        control(): boolean;
        shift(): boolean;
    }
    class TextInputArgs {
        private fText;
        constructor(fText: string);
        text(): string;
    }
    class MouseButtonInputArgs {
        private fButton;
        private fPressed;
        private fPosition;
        constructor(fButton: Button, fPressed: boolean, fPosition: Point);
        button(): Button;
        pressed(): boolean;
        position(): Point;
    }
    class MouseWheelInputArgs {
        private fDelta;
        private fPosition;
        constructor(fDelta: number, fPosition: Point);
        delta(): number;
        position(): Point;
    }
    class MouseMoveInputArgs {
        private position;
        constructor(position: Point);
    }
    class Input {
        key: {
            (args: KeyInputArgs): EventResult;
        }[];
        mouseButton: {
            (args: MouseButtonInputArgs): EventResult;
        }[];
        text: (args: TextInputArgs) => EventResult;
        mouseWheel: (args: MouseWheelEvent) => EventResult;
        mouseMove: (args: MouseMoveInputArgs) => EventResult;
        processInput(args: Object): EventResult;
    }
}
