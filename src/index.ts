import {SceneManager} from "./Management";
import {SceneTest} from "./scenes";


SceneManager.initialize(1920,1080,0x6495ed);
SceneManager.changeScene(new SceneTest());