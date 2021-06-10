import 'phaser';
import logoImg from '../assets/logo.jpg';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.image('logo', logoImg)
  }
 
  create () {
    this.scene.start('Preloader')
  }
};