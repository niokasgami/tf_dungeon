import {BitmapFont} from "pixi.js";


export class Graphics {
    // @todo make the thing work with the actual screen?
    private static _width = 1920;
    private static _height = 1080;

    /**
     * the screen width
     */
    public static get width(): number {
        return this._width;
    }

    public static get height(): number {
        return this._height;
    }

    public static init(){
        this.loadSystemFont();
    }

    private static loadSystemFont(){
        BitmapFont.from("comic 32", {
            fill: "#ffffff", // White, will be colored later
            fontFamily: "Comic Sans MS",
            fontSize: 32
        });
    }

    public static get systemFont(): string {
        return "comic 32";
    }
}