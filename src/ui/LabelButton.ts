import { BitmapText, NineSlicePlane, Texture } from "pixi.js";


export class LabelButton extends NineSlicePlane {

    private _label: BitmapText;

    constructor(texture: Texture, label: string) {
        super(texture);
        this.createLabel(label);
        this.width = 350;
        this.height = 100;
    }

    setLabel(label: string) {
        this._label.text = label;
    }

    private createLabel(label: string) {
        const options = {
            fontName: "comic 32",
            fontSize: 32,
        }
        this._label = new BitmapText(label, options);
        this.addChild(this._label);
        //  this._label.anchor.set(0.5, 0.5);
        this._label.x = this.width / 2;
        this._label.y = this.height / 2;
    }

    setFrame(leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number) {
        this.leftWidth = leftWidth;
        this.topHeight = topHeight;
        this.rightWidth = rightWidth;
        this.bottomHeight = bottomHeight;
    }
}