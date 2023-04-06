
import {IScene} from "./IScene";
import {Application} from "pixi.js";


export class SceneManager {
    private constructor() {}
    private static app: Application;
    private static currentScene: IScene;

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




        this.app = new Application({
            // @ts-ignore
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        this.app.ticker.add(this.update);
    }

    public static changeScene(newScene: IScene){
        if(this.currentScene){
            this.app.stage.removeChild(this.currentScene)
            this.currentScene.destroy();
        }
        this.currentScene = newScene;
        this.app.stage.addChild(this.currentScene);
    }

    public static update(delta: number){
        if(this.currentScene){
            this.currentScene.update(delta);
        }
    }


}