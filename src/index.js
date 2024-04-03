
import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";
import MenuScene from "./scenes/MenuScene";
import PreloadScene from "./scenes/PreloadScene";
import ScoreScene from "./scenes/ScoreScene";
import PauseScene from "./scenes/PauseScene";

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = {x: WIDTH * 0.1, y: HEIGHT / 2};

const SHARED_CONFIG = {
  width : WIDTH,
  height : HEIGHT,
  startPosition : BIRD_POSITION
}

const Scenes = [ScoreScene, PreloadScene, MenuScene,  PlayScene, PauseScene];
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.Map((createScene));

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG, 
  physics: {
    default: 'arcade',
    arcade: {
      
      debug: true
    }
  },
  scene: [PreloadScene, new MenuScene(SHARED_CONFIG), new PlayScene(SHARED_CONFIG), new PauseScene(SHARED_CONFIG), new ScoreScene(SHARED_CONFIG)]  
}
new Phaser.Game(config);