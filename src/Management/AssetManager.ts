import { Assets, SCALE_MODES } from "pixi.js";

/**
 * helper class that is used when preloading assets in the scene. it is not mandatory,
 * but it helps to compact the work.
 */

export class AssetManager {

    private static _rootPath = "./assets/";
    // the queue is added simply as the new Pixijs Assets  class doesn't have a convenient way other than bundle
    private static _queue: string[] = [];


    /**
     * A static method to queue an asset file for loading.
     *
     * @param {string} filename - the name of the file to be queued
     * @param {string} directory - the directory where the file is located
     */
    public static queue(filename: string, directory: string) {
        const key = filename.split(".");
        const url = this._rootPath + directory + "/" + filename;
        const data = { scaleMode: SCALE_MODES.LINEAR };
        Assets.add(key[0], url, data);
        this._queue.push(key[0]);
    }

    /**
     * Takes a filepath and queues the file for processing.
     *
     * @param {string} filepath - The path to the file
     */
    public static autoQueue(filepath: string): void {
        const lastIndex = filepath.lastIndexOf("/");
        const directory = filepath.substring(0, lastIndex);
        const file = filepath.substring(lastIndex + 1);
        this.queue(file, directory);
    }

    /**
     * Shorthand function to load images directly from the picture folder
     * @param filename
     */
    public static queueBack(filename: string) {
        this.queue(filename, "sprites/background");
    }

    public static queueData(filename: string) {
        const directory = "data";
        this.queue(filename, directory);
    }


    /**
     * Load function to asynchronously load assets.
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
    public static fetch<T>(key: string): T {
        // it should be fine to get the key as the assets has been preloaded already
        return Assets.get(key) as T;
    }
}