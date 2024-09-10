import { Container, Spritesheet } from "pixi.js";
import { GameManager } from "../Management";
import { PotionButton } from "./PotionButton";
import { LabelButton } from "./LabelButton";

export class ButtonGroup extends Container {

    private _redButton: PotionButton;
    private _greenButton: PotionButton;
    private _blueButton: PotionButton;
    private _craftButton: LabelButton;
    private _atlas: Spritesheet;

    private margin: number = 10;
    constructor(atlas: Spritesheet) {
        super();
        this._atlas = atlas;
        this.createButtons();
        GameManager.shared.bindEvent("onCraftReady", this.onCraftReady.bind(this));
    }

    private onCraftReady() {

    }

    private createButtons() {
        this.createRedButton();
        this.createGreenButton();
        this.createBlueButton();
        this.createCraftButton();
        this.placeButtons();
    }

    private createRedButton() {
        this._redButton = new PotionButton(this._atlas.textures["Red"], "RED");
        this.addChild(this._redButton);
    }

    private createGreenButton() {
        this._greenButton = new PotionButton(this._atlas.textures["Green"], "GREEN");

        this.addChild(this._greenButton);
    }

    private createBlueButton() {
        this._blueButton = new PotionButton(this._atlas.textures["Blue"], "BLUE");
        this.addChild(this._blueButton);
    }

    private createCraftButton() {
        this._craftButton = new LabelButton(this._atlas.textures["Craft"], "CRAFT");
        this._craftButton.setFrame(5, 5, 5, 5);
        this.addChild(this._craftButton);
    }

    private placeButtons() {
        this._redButton.x = 0;
        this._greenButton.x = this._redButton.width + this.margin;
        this._blueButton.x = (this._redButton.width + this.margin) * 2;
        this._craftButton.x = this._greenButton.x;
        this._craftButton.y -= this._redButton.height + this.margin;
    }
}