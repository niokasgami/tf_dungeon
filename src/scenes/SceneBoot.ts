import {BitmapFont} from "pixi.js";
import {AssetManager, CraftingManager, PotionDataStruct, SceneManager} from "../Management";
import {SceneBase} from "./SceneBase";

import {SceneTitle} from "./SceneTitle";


export class SceneBoot extends SceneBase {
  private _isLoading = true;

  override async preload(): Promise<void> {
    AssetManager.queueData("dataPotions.json");
    await AssetManager.load()
  }

  override create(): void {
    super.create();


    const potions = AssetManager.fetch<PotionDataStruct[]>("dataPotions");
    CraftingManager.shared.assignData(potions);

    BitmapFont.from("comic 32", {
      fill: "#ffffff", // White, will be colored later
      fontFamily: "Comic Sans MS",
      fontSize: 32,

    }, {
      chars: BitmapFont.ASCII
    });
  }

  override start(): void {
    super.start();
    this.startFadeOut(100, 0);
    this._isLoading = false;
  }

  override update(delta: number): void {
    super.update(delta);
    if (!this.isFading() && !this._isLoading) {
      this.terminate();
    }
  }

  override terminate(): void {
    SceneManager.goto(new SceneTitle());
  }
}

