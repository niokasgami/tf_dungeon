import {SceneBase} from "./SceneBase";
import {BitmapText} from "pixi.js";


export class SceneMain extends SceneBase {

    // @ts-ignore
    private _mainText: BitmapText;

    constructor() {
        super();
    }

    override create() {
        super.create();
        this.createMainText();
    }

    private createMainText(){
        this._mainText = new BitmapText("dummy");
        this._mainText.align = "center";
        this.centerChild(this._mainText);
        this.addChild(this._mainText);
    }


}