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

    this.upKey = this.add.image(170, 150, 'upkey');
    this.upKey = this.add.image(170, 210, 'upkey');
    this.upKey = this.add.image(110, 210, 'upkey');
    this.dungIcon = this.add.image(170, 265, 'dung');
    this.dungIcon.scale = 0.12;
    this.toxicdungIcon = this.add.image(170, 325, 'toxicDung');
    this.toxicdungIcon.scale = 0.12;

    this.jumpText = this.add.text(210, 135, 'Jump', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.doubleJumpText = this.add.text(210, 195, 'Double Jump', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.dungText = this.add.text(210, 255, 'Collect dung to earn points', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.dungText = this.add.text(210, 315, 'Avoid contaminated dung,', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.dungText = this.add.text(210, 365, 'pesticides are bad for you!', {
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
