import { FederatedPointerEvent, Text } from "pixi.js";
import { AssetManager, SceneManager } from "../Management";
import { SceneBase } from "./SceneBase";
import { SceneMain } from "./SceneMain";


export class SceneTitle extends SceneBase {

    private _title: Text;
    private _button: Text;

    constructor() {
        super();
    }

    override async preload() {
        await AssetManager.load();
    }

    override create() {
        super.create();
        this.createTitle();
        this.createButton();
    }


    override start(): void {
        super.start();
        this.startFadeIn(100, 0);
    }


    private createTitle() {
        this._title = new Text("Witch brew", {
            fontFamily: "Comic Sans MS",
            fontSize: 72,
            fill: 0xffffff
        });
        this.centerChild(this._title);
        this._title.y = 200;
        this.addChild(this._title);
    }

    private createButton() {
        this._button = new Text("Start", {
            fontFamily: "Comic Sans MS",
            fontSize: 32,
            fill: 0xffffff
        });
        this.centerChild(this._button);
        this._button.y = 300;
        this._button.eventMode = "dynamic";

        // todo : clean up the code later
        this._button.on("pointertap", this.onButtonClick, this);
        this._button.on("pointerover", (e: FederatedPointerEvent) => {
            this._button.scale.set(1.2, 1.2);
        }, this);

        this._button.on("pointerout", (e: FederatedPointerEvent) => {
            this._button.scale.set(1, 1);
        })
        this.addChild(this._button);
    }

    onButtonClick(e: FederatedPointerEvent) {
        this.startFadeOut(100, 0);
        SceneManager.goto(new SceneMain())
    }



}