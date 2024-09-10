import { GameManager } from "./GameManager";
import { PotionDataStruct } from "./interfaces";


export class CraftingManager {

    private _recipes: Map<string, PotionDataStruct> = new Map();


    static readonly shared: CraftingManager = new CraftingManager();

    private constructor() { }


    /**
     * Crafts an item using the provided slots.
     *
     * @param {string} slotA - the first slot
     * @param {string} slotB - the second slot
     * @param {string} slotC - the third slot
     * @return {void} 
     */
    public craft(slotA: string, slotB: string, slotC: string): void {
        const input = [slotA, slotB, slotC].sort();
        const recipe = this._recipes.get(input.join("-"));
        this.onCraftingSuccess(recipe);
    }

    private onCraftingSuccess(recipe: PotionDataStruct) {
        console.log("you crafted a Potion! ", recipe.displayName);
        GameManager.shared.callEvent("onCraftingSucess", recipe.key);
    }
    /**
     * Assigns data to the recipes map based on the provided PotionDataStruct array.
     *
     * @param {PotionDataStruct[]} data - an array of PotionDataStruct to be assigned
     * @return {void} 
     */
    assignData(data: PotionDataStruct[]) {
        data.forEach(recipe => {
            let key = [recipe.slotA, recipe.slotB, recipe.slotC].sort();
            this._recipes.set(key.join("-"), recipe);
        });
        console.log(this._recipes);
    }
}