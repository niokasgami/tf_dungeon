import { Sprite, Spritesheet } from "pixi.js";
import { GameManager } from "../Management";


/**
 * The class that handle the witch texture swapping
 */
export class SpriteWitch extends Sprite {

  private _atlas: Spritesheet;

  constructor(atlas: Spritesheet) {
    super();
    this._atlas = atlas;
    this.anchor.set(0.5, 0);
    this.assignDefaultTexture();
    GameManager.shared.bindEvent("onCraftingSucess", this.swapTexture.bind(this));
  }

  private assignDefaultTexture() {
    this.swapTexture("normal");
  }

  swapTexture(texture: string) {
    const key = "Witch/" + texture;
    this.texture = this._atlas.textures[key];
  }

  swapToNormal() {
    this.swapTexture("normal");
  }

  swapToBigBoobs() {
    this.swapTexture("bigBoobs");
  }

  swapToBigTits() {
    this.swapTexture("bigTits");
  }


}