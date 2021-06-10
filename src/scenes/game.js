import 'phaser';
 
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload () {
    this.load.image('logo', 'assets/background.png');
    this.load.image('background', 'assets/background.png')
  }
 
  create () {
    this.add.image(400,300, 'background');
  }
};