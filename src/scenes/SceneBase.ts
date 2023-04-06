import {BitmapText, Container, Sprite} from "pixi.js";
import {IScene} from "../Management";
import {Graphics} from "../core";


export class SceneBase extends Container {

    constructor() {
        super();
        this.preload().then(()=> {
            this.create();
        });
    }

     async preload(): Promise<void> {
     }

    create(){
    }

    update(delta: number){
        for(const child of this.children as IScene[]) {
            if(!!child.update){
                child.update(delta);
            }
        }
    }

    stop(){

    }
    start(){

    }

    public centerChild(element: Sprite | BitmapText){
        element.anchor.set(0.5,0.5);
        element.x = Graphics.width / 2;
        element.y = Graphics.height / 2;
    }
}
