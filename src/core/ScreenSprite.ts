import { Container, Graphics } from "pixi.js";


/**
 * @license : RPG MAKER MZ
 */
export class ScreenSprite extends Container {

    private _graphics: Graphics;
    private _red: number;
    private _green: number;
    private _blue: number;

    constructor() {
        super();
        this._graphics = new Graphics();
        this.addChild(this._graphics);
        this.opacity = 0;
        this._red = -1;
        this._green = -1;
        this._blue = -1;
        this.setBlack();
    }

    get opacity(): number {
        return this.alpha * 255;
    }
    set opacity(value: number) {
        this.alpha = value.clamp(0, 255) / 255;
    }

    override destroy(): void {
        const options = { children: true, texture: true };
        super.destroy(options);
    }

    setBlack(): void {
        this.setColor(0, 0, 0);
    }

    setWhite(): void {
        this.setColor(255, 255, 255);
    }

    setColor(r: number, g: number, b: number) {
        if (this._red !== r || this._green !== g || this._blue !== b) {
            r = Math.round(r || 0).clamp(0, 255);
            g = Math.round(g || 0).clamp(0, 255);
            b = Math.round(b || 0).clamp(0, 255);
            this._red = r;
            this._green = g;
            this._blue = b;
            const graphics = this._graphics;
            graphics.clear();
            graphics.beginFill((r << 16) | (g << 8) | b, 1);
            graphics.drawRect(-50000, -50000, 100000, 100000);
        }
    }

}