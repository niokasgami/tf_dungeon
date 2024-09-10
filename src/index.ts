import { SceneManager } from "./Management";
import { SceneBoot } from "./scenes/SceneBoot";


SceneManager.initialize(1920, 1080, 0x000000);
SceneManager.goto(new SceneBoot());