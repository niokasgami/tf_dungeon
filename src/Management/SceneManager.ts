
import { IScene } from "./IScene";
import { Application, Ticker } from "pixi.js";
import { Graphics } from "../core";


export class SceneManager {
    private constructor() { }
    private static app: Application;
    private static _currentScene: IScene;
    public static TEMP: IScene;

    private static _width: number;
    private static _height: number;
    public static get width(): number {
        return this._width;
    }
    public static get height(): number {
        return this._height;
    }

    public static initialize(width: number, height: number, background: number) {
        this._width = width;
        this._height = height;

        Graphics.init();
        // @ts-ignore
        this.app = new Application({
            // @ts-ignore
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height,
            autoStart: false,
            sharedTicker: true
        });
        Ticker.shared.add(this.update.bind(this));
        //    this.app.ticker.remove(this.app.render, this.app);
        //    this.app.ticker.add(this.update.bind(this));

        //    Ticker.shared.autoStart = true;
    }

    public static changeScene(newScene: IScene) {
        if (this._currentScene) {
            this.app.stage.removeChild(this._currentScene)
            this._currentScene.destroy();
        }
        this._currentScene = newScene;
        this.app.stage.addChild(this._currentScene);
    }

    public static update(delta: number) {
        if (this._currentScene) {
            this._currentScene.update(delta);
        }

    }

    public static currentScene() {
        return this._currentScene;
    }

    public static startLoop() {
        this.app.ticker.start();
    }


}