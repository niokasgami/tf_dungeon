import { DisplayObject } from "pixi.js";

export interface IScene extends DisplayObject {
    update(delta: number): void;
    preload(): void;
    create(): void;
    start(): void;
    update(delta: number): void;
    stop(): void;
    terminate(): void;
    isBusy(): boolean;
}