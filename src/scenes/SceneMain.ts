import { SceneBase } from "./SceneBase";
import { Sprite, Spritesheet } from "pixi.js";
import { AssetManager } from "../Management";
import { SpriteWitch } from "../ui/SpriteWitch";
import { ButtonGroup } from "../ui";
import { Graphics } from "../core";


export class SceneMain extends SceneBase {

  private _background: Sprite;
  private _witch: SpriteWitch;
  private _buttonGroups: ButtonGroup;

  constructor() {
    super();
  }

  override async preload(): Promise<void> {
    AssetManager.queue("clampy.png", "sprites");
    AssetManager.autoQueue("sprites/ui/button.png");
    AssetManager.queueBack("back_01.png");
    AssetManager.queue("Witch_data.json", "sprites/characters");
    AssetManager.queue("potions_data.json", "sprites/ui");

    await AssetManager.load();
  }

  override create() {
    super.create();
    this.createBackground();
    this.createWitch();
    this.createButtonsGroup();
  }

  override start(): void {
    super.start();
    this.startFadeIn(100, 0);
  }
  private createBackground() {
    this._background = new Sprite();
    this._background.texture = AssetManager.fetch("back_01");

    this.centerChild(this._background);
    this.addChild(this._background);
  }

  private createWitch() {
    let witchData = AssetManager.fetch<Spritesheet>("Witch_data");
    this._witch = new SpriteWitch(witchData);
    this._witch.anchor.set(0.5, 0);
    this.centerChild(this._witch);
    this.addChild(this._witch);
  }

  private createButtonsGroup() {
    const data = AssetManager.fetch<Spritesheet>("potions_data");
    this._buttonGroups = new ButtonGroup(data);
    this._buttonGroups.pivot.set(this._buttonGroups.width / 2, this._buttonGroups.height / 2);
    this._buttonGroups.scale.set(0.5, 0.5);
    this._buttonGroups.x = Graphics.width / 2;
    this._buttonGroups.y = Graphics.height / 2 + 100;
    this.addChild(this._buttonGroups);
  }

}