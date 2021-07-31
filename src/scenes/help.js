import Phaser from 'phaser';
import { Button } from '../objects/button';

export default class HelpScene extends Phaser.Scene {
  constructor() {
    super('Help');
  }

  preload() {
    this.load.image('logo', 'assets/logo.jpg');
  }

  create() {
    this.title = this.add.text(250, 30, 'Game Instructions', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.upKey = this.add.image(200, 200, 'upkey');
    this.upKey = this.add.image(200, 250, 'upkey');
    this.upKey = this.add.image(140, 250, 'upkey');

    this.jumpText = this.add.text(240, 185, 'Jump', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.doubleJumpText = this.add.text(240, 235, 'Double Jump', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    this.menuButton.on('pointerover', () => {
      this.setTexture('blueButton2');
    });

    this.menuButton.on('pointerout', () => {
      this.setTexture('blueButton1');
    });
  }
}
