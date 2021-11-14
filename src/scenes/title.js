import Phaser from 'phaser';
import config from '../config/config';
import { Button } from '../objects/button';
import { getScores } from '../api';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.add.image(400, 300, 'logo');

    // Game
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Play',
      'Game',
    );

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      'blueButton1',
      'blueButton2',
      'Options',
      'Options',
    );

    // Help
    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Help',
      'Help',
    );

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('music', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }

    // Leaderboard

    this.leaderboardButton = this.add
      .sprite(config.width / 2, config.height / 2 + 200, 'blueButton1')
      .setInteractive();
    this.leaderboardText = this.add.text(0, 0, 'Scores', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.leaderboardButton.on('pointerover', () => {
      this.leaderboardButton.setTexture('blueButton2');
    });

    this.leaderboardButton.on('pointerout', () => {
      this.leaderboardButton.setTexture('blueButton1');
    });

    const that = this;
    this.leaderboardButton.on('pointerdown', () => {
      getScores().then((result) => {
        that.scene.start('Scores', result);
      });
    });

    Phaser.Display.Align.In.Center(
      this.leaderboardText,
      this.leaderboardButton,
    );
  }
}
