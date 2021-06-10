import 'phaser';
import backgroundImg from '../assets/background.png'
import logoImg from '../assets/logo.jpg';
 
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload () {
    this.load.image('logo', logoImg);
    this.load.image('background', backgroundImg)
  }
 
  create () {
    this.add.image(400,300, 'background');
  }
};