import { SceneBase } from "./SceneBase";
import { BitmapFont, BitmapText, NineSlicePlane, Sprite } from "pixi.js";
import { AssetManager } from "../Management";
import { Graphics } from "../core";


export class SceneTest extends SceneBase {

    private _mainArea: NineSlicePlane;

    private _mainText: BitmapText;

    private _background: Sprite;
    constructor() {
        super();
        BitmapFont.from("comic 32", {
            fill: "#ffffff", // White, will be colored later
            fontFamily: "Comic Sans MS",
            fontSize: 32
        })
    }

    override async preload(): Promise<void> {
        AssetManager.queue("clampy.png", "sprites");
        AssetManager.queue("button.png", "sprites/ui");
        AssetManager.queueBack("back_01.png");
        // always add load at the end to make sure we actually load it
        await AssetManager.load();
    }

    override create() {

        super.create();
        this.createBackground();
        this.createMainArea();

        this.createMainText();
        console.log("create is done!");

    }

    override start() {
        super.start();
    }

    override update(delta: number) {
        super.update(delta);
        //  this._mainArea.rotation += 0.1;
        this._mainText.x += 1;
    }

    private createMainArea() {
        const texture = AssetManager.fetch("button");
        this._mainArea = new NineSlicePlane(texture);
        //     this._mainArea.pivot.set(0.5,0.5);
        this._mainArea.x = Graphics.width / 2;
        this._mainArea.y = Graphics.height / 2;
        this._mainArea.width = 100;
        this._mainArea.height = 100;
        this.addChild(this._mainArea);
    }
    private createMainText() {
        this._mainText = new BitmapText("dummy", {
            fontName: "comic 32",
            fontSize: 32, // Making it too big or too small will look bad
            //    tint: 0xFF0000 // Here we make it red.
        });
        this._mainText.align = "center";
        this.centerChild(this._mainText);
        this._mainText.x = 100;
        this.addChild(this._mainText);
    }

    private createBackground() {
        this._background = new Sprite();

        this._background.texture = AssetManager.fetch("back_01");
        console.log(this._background.texture.baseTexture.scaleMode);
        this._background.scale.set(2, 2);
        this.centerChild(this._background);
        this.addChild(this._background);
    }
}