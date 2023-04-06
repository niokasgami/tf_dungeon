import {Assets} from "pixi.js";

/**
 * helper class that is used when preloading assets in the scene. it is not mandatory,
 * but it helps to compact the work.
 */
export class AssetManager {

    private static _rootPath = "./assets/";
    // the queue is added simply as the new Pixijs Assets  class doesn't have a convenient way other than bundle
    private static _queue: string[] = [];

    public static queue(filename: string, directory: string) {
        const key = filename.split(".");
        const url = this._rootPath + directory + "/" + filename;
        Assets.add(key[0], url);
        this._queue.push(key[0]);
    }

    /**
     * load all the queued assets
     * @async
     */
    public static async load() {
        await Assets.load(this._queue);
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