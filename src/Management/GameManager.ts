import { CraftingManager } from "./CraftingManager";
import { EventEmitter } from "@pixi/utils";


export class GameManager {

    static readonly shared = new GameManager();
    private _slots: string[];
    private readonly _emitter: EventEmitter;

    private constructor() {
        this._slots = [null, null, null];
        this._emitter = new EventEmitter();

    }
    
    
    public get emitter(): EventEmitter {
        return this._emitter;
    }

    /**
     * Allow to subscribe a class to an event
     * @param eventName the name of the event
     * @param callback the callback
     */
    public bindEvent(eventName: string, callback: (...args: any[]) => void) {
        this._emitter.on(eventName, callback);
    }

    /**
     * Call a specific event with the given event name and arguments.
     *
     * @param {string} eventName - the name of the event to be called
     * @param {...any} args - arguments to be passed to the event handler
     */
    public callEvent(eventName: string, ...args: any[]) {
        this._emitter.emit(eventName, ...args);
    }

    private canCraft(): boolean {
        return this._slots.every(slot => slot !== null);
    }

    reset() {
        this._slots = [null, null, null];
    }

    onSlotClick(slot: string) {
        for (let i = 0; i < this._slots.length; i++) {
            if (this._slots[i] === null) {
                this._slots[i] = slot;
                break;
            }
        }
        console.log(this._slots);
        if (this.canCraft()) {
            this._emitter.emit("onCraftReady");
        }
    }

    onCraftConfirmed() {
        var s = this._slots;
        CraftingManager.shared.craft(s[0], s[1], s[2]);
    }
}