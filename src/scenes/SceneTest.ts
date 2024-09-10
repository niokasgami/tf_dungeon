import {SceneBase} from "./SceneBase";
import {Sprite, Spritesheet, Texture} from "pixi.js";
import {AssetManager} from "../Management";
import {Graphics} from "../core";
import {ButtonGroup} from "../ui";



export class SceneTest extends SceneBase {
  private _background: Sprite;
  private _witch: Sprite;
  private _spriteset: ButtonGroup;

  // private _data: Spritesheet;

  constructor() {
    super();
  }

  override async preload(): Promise<void> {
    AssetManager.queue("clampy.png", "sprites");
    AssetManager.autoQueue("sprites/ui/button.png");
    AssetManager.queueBack("back_01.png");
    AssetManager.queue("Witch_data.json", "sprites/characters");
    AssetManager.queue("potions_data.json", "sprites/ui");
    // always add load at the end to make sure we actually load it
    await AssetManager.load();
  }

  override create() {

    super.create();

    this.createBackground();
    this.createMainArea();
    this.createWitch();
    this.createButtons();
    console.log("create is done!");

  }

  private createWitch() {
    let witchData = AssetManager.fetch<Spritesheet>("Witch_data");
    this._witch = new Sprite(witchData.textures["Witch_00.png"]);
    this._witch.scale.set(0.6, 0.6);
    this._witch.anchor.set(0.5, 0);
    this.centerChild(this._witch);
    this.addChild(this._witch);

    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  private createButtons() {
    this._spriteset = new ButtonGroup(AssetManager.fetch<Spritesheet>("potions_data"));
    this._spriteset.pivot.set(this._spriteset.width / 2, this._spriteset.height / 2);
    this._spriteset.scale.set(0.5, 0.5);
    this._spriteset.x = Graphics.width / 2;
    this._spriteset.y = Graphics.height / 2 + 100;
    this.addChild(this._spriteset);
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.key == "w") {
      let witchData = AssetManager.fetch<Spritesheet>("Witch_data");
      this._witch.texture = witchData.textures["Witch_01.png"];
    }
  }

  private onKeyUp(_e: KeyboardEvent) {

  }

  override start() {
    super.start();
    this.startFadeIn(100, 0);

  }

  override update(delta: number) {
    super.update(delta);
    //  this._mainArea.rotation += 0.1;
    //this._mainText.x += 1;
  }

  private createMainArea() {
    const texture = AssetManager.fetch<Texture>("button");
    const button1 = new Sprite(texture);
    const button2 = new Sprite(texture);
    const button3 = new Sprite(texture);
    const margin = 10;
    button1.x = 0;
    button2.x = button1.width + margin;
    button3.x = (button1.width + margin) * 2;
    this.addChild(button1, button2, button3);


  }


  private createBackground() {
    this._background = new Sprite();

    this._background.texture = AssetManager.fetch("back_01");
    /// console.log(this._background.texture.baseTexture.scaleMode);
    this._background.scale.set(2, 2);
    this.centerChild(this._background);
    this.addChild(this._background);
  }

  override terminate(): void {
    super.terminate();
  }
}