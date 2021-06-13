import 'phaser';
import config from './config/config';
import GameScene from './scenes/game';
import BootScene from './scenes/boot';
import PreloaderScene from './scenes/preloader';
import TitleScene from './scenes/title';
import OptionsScene from './scenes/options';
import CreditsScene from './scenes/credits';
import Model from './model'
 
class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model()
    this.globals = { model }
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}
 
window.game = new Game();