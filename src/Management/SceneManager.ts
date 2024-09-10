import { Application, Ticker } from "pixi.js";
import { IScene } from "./IScene";

// TODO : cleanup the code for later usage
export class SceneManager {
  private constructor() { }

  private static app: Application;
  private static _width: number;
  private static _height: number;

  private static _currentScene: IScene;
  private static _nextScene: IScene = null;
  private static _exitingScene = false;

  public static get width(): number {
    return this._width;
  }
  public static get height(): number {
    return this._height;
  }

  public static initialize(width: number, height: number, background: number) {
    this._width = width;
    this._height = height;

    // Graphics.init();
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
    Ticker.shared.autoStart = false;
    Ticker.shared.stop();
    Ticker.shared.add(this.update.bind(this));
  }

  public static onSceneChange() {
    if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
      if (this._currentScene) {
        this._currentScene.terminate();
        this.app.stage.removeChild(this._currentScene)
        this._currentScene.destroy();
      }
      this._currentScene = this._nextScene;
      this._nextScene = null;
      this.app.stage.addChild(this._currentScene);
    }
  }


  public static isSceneChanging(): boolean {
    return this._exitingScene || !!this._nextScene;
  }

  public static isCurrentSceneBusy() {
    return this._currentScene && this._currentScene.isBusy();
  }

  public static goto(newScene: IScene) {
    if (newScene) {
      this._nextScene = newScene;
    }
    if (this._currentScene) {
      this._currentScene.stop();
    }
  }

  public static update(delta: number) {
    this.onSceneChange();
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