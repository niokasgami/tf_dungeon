import {SceneBase} from "./SceneBase";
import {Assets, BitmapText, Sprite} from "pixi.js";
import {AssetManager, SceneManager} from "../Management";


export class SceneTest extends SceneBase {

    // @ts-ignore
    private clampy: Sprite;
    // @ts-ignore
    private _mainText: BitmapText;
    constructor() {
        super();
    }

    override async preload(): Promise<void> {
        AssetManager.queue("clampy.png","sprites");
        // always add load at the end to make sure we actually load it
        await AssetManager.load();
    }

    override create() {
        super.create();
        this.clampy = new Sprite();
        this.clampy.texture = Assets.get("clampy");
        this.clampy.anchor.set(0.5,0.5);
        this.clampy.x = SceneManager.width / 2;
        this.clampy.y = SceneManager.height / 2;
        this.addChild(this.clampy);
        this.createMainText();
    }

    private createMainText(){
        this._mainText = new BitmapText("dummy");
        this._mainText.align = "center";
        this.centerChild(this._mainText);
        this.addChild(this._mainText);
    }
}