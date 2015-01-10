/// <reference path="entity.d.ts" />
/// <reference path="state.d.ts" />
/// <reference path="input.d.ts" />
declare module Nifty {
    class EntityManager {
        private entities;
        private inputEntities;
        private entityGrid;
        private parent;
        private currentEntity;
        private cleanupTimer;
        constructor(parent: State);
        processInput(args: Object): EventResult;
        update(): void;
        draw(): void;
        add(entity: Entity): void;
        remove(entity: Entity): void;
        clear(): void;
        inArea(areaRect: Rect): Entity[];
        placeFree(rect: Rect): boolean;
        get(): Entity[];
    }
}
