import { Sprite, Texture } from "pixi.js";
import { GameManager, POTION_TYPE } from "../Management";
import { OutlineFilter } from "pixi-filters";

/**
 * 
 */
export class PotionButton extends Sprite {

  private static _outlineFilter = new OutlineFilter(5, 0xFFFFFF);
  constructor(texture: Texture, type: POTION_TYPE) {
    super(texture);
    this.eventMode = "dynamic";
    this.on("pointerover", this.onHover.bind(this));
    this.on("pointerout", this.onExit.bind(this));
    this.on("pointertap", this.onClick.bind(this, type))
  }

  onClick(type: POTION_TYPE) {
    GameManager.shared.onSlotClick(type);
  }

  onHover() {
    this.filters = [PotionButton._outlineFilter];
    GameManager.shared.callEvent("onCraftingSucess", "bigTits");
  }

  onExit() {
    this.filters = [];
  }
}
