import {Assets, SCALE_MODES} from "pixi.js";

/**
 * helper class that is used when preloading assets in the scene. it is not mandatory,
 * but it helps to compact the work.
 */
export class AssetManager {

    private static _rootPath = "./assets/";
    // the queue is added simply as the new Pixijs Assets  class doesn't have a convenient way other than bundle
    private static _queue: string[] = [];

    /**
     * will queue the assets and give it an key
     * do take in considerations that you would need to add the extension
     * @param filename
     * @param directory
     */
    public static queue(filename: string, directory: string) {
        const key = filename.split(".");
        const url = this._rootPath + directory + "/" + filename;
        const data = {scaleMode: SCALE_MODES.NEAREST};
        Assets.add(key[0], url, data);
        this._queue.push(key[0]);
    }


    /**
     * Shorthand function to load images directly from the picture folder
     * @param filename
     */
    public static queueBack(filename: string){
            this.queue(filename,"sprites/background");
    }
    /**
     * load all the queued assets
     * @async
     */
    public static async load() {
        await Assets.load(this._queue);
        // we clear the queue as the queue is not needed anymore
        this._queue = [];
    }

    /**
     * fetch the asset.
     * it assumes that the assets was already preloaded before end
     * @param key
     */
    public static fetch(key: string) {
        // it should be fine to get the key as the assets has been preloaded already
        return Assets.get(key);
    }
}