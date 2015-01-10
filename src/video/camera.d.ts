/// <reference path="../system/point.d.ts" />
/// <reference path="../system/rect.d.ts" />
/// <reference path="../system/util.d.ts" />
/// <reference path="backend/view.d.ts" />
declare module Nifty {
    class Camera {
        position: Point;
        smooth: boolean;
        smoothness: number;
        roundPosition: boolean;
        _actualPosition: Point;
        private view;
        private originalSize;
        constructor(value: View);
        update(): void;
        apply(): void;
        setZoom(value: number): void;
        getZoom(): number;
        getBounds(): Rect;
    }
}
