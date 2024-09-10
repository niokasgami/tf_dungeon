import {AnimatedSprite, BitmapText, Container, Sprite} from "pixi.js";
import {IScene, SceneManager} from "../Management";
import {Graphics} from "../core";
import {ColorFilter} from "../core/ColorFilter";


export abstract class SceneBase extends Container {

  private _colorFilter: ColorFilter;
  private _fadeSign: number;
  private _fadeDuration: number;
  private _fadeWhite: number;
  private _fadeOpacity: number;

  constructor() {
    super();
    this._fadeSign = 0;
    this._fadeDuration = 0;
    this._fadeWhite = 0;
    this._fadeOpacity = 0;
    this.createColorFilter();
    this.preload().then(() => {
      this.create();
    }).then(() => {
      this.start();
    });
  }

  abstract preload(): Promise<void>;

  create() {

  }

  update(delta: number) {
    this.updateFade();
    this.updateColorFilter();
    for (const child of this.children as IScene[]) {
      if (!!child.update) {
        child.update(delta);
      }
    }
  }

  stop() {

  }

  start() {
    SceneManager.startLoop();
  }

  isBusy(): boolean {
    return this.isFading();
  }

  isFading(): boolean {
    return this._fadeDuration > 0;
  }

  public centerChild(element: Sprite | BitmapText | AnimatedSprite) {
    element.anchor.set(0.5, 0.5);
    element.x = Graphics.width / 2;
    element.y = Graphics.height / 2;
  }

  private createColorFilter() {
    this._colorFilter = new ColorFilter();
    this.filters = [this._colorFilter];
  }

  updateColorFilter() {
    const c = this._fadeWhite ? 255 : 0;
    const blendColor = [c, c, c, this._fadeOpacity];
    this._colorFilter.setBlendColor(blendColor);
  }

  updateFade() {
    if (this._fadeDuration > 0) {
      const d = this._fadeDuration;
      if (this._fadeSign > 0) {
        this._fadeOpacity -= this._fadeOpacity / d;
      } else {
        this._fadeOpacity += (255 - this._fadeOpacity) / d;
      }
      this._fadeDuration--;
    }
  }

  startFadeIn(duration: number, white: number) {
    this._fadeSign = 1;
    this._fadeDuration = duration || 30;
    this._fadeWhite = white;
    this._fadeOpacity = 255;
    this.updateColorFilter();
  }

  startFadeOut(duration: number, white: number) {
    this._fadeSign = -1;
    this._fadeDuration = duration || 30;
    this._fadeWhite = white;
    this._fadeOpacity = 0;
    this.updateColorFilter();
  }

  terminate() {
  }
}


