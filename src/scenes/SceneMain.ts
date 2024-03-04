import {SceneBase} from "./SceneBase";
import {BitmapText, Sprite} from "pixi.js";
import {AssetManager} from "../Management";


export class SceneMain extends SceneBase {

  // @ts-ignore
  private _mainText: BitmapText;
  private _background: Sprite;

  constructor() {
    super();
  }

  override async preload(): Promise<void> {
    AssetManager.queueBack("back_01");
    await AssetManager.load();
  }

  override create() {
    super.create();
    this.createBackground();
    this.createMainText();
  }

  private createBackground() {
    this._background = new Sprite();
    this._background.texture = AssetManager.fetch("back_01");

    this.centerChild(this._background);
    this.addChild(this._background);
  }

  private createMainText() {
    this._mainText = new BitmapText("dummy");
    this._mainText.align = "center";
    this.centerChild(this._mainText);
    this.addChild(this._mainText);
  }


}