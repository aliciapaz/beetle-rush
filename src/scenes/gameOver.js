import Phaser from 'phaser';
import config from '../config/config';
import { Button } from '../objects/button';
import createForm from '../objects/form';
import * as scoreBoard from '../api';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.soilHealth = data.soilHealth;
    this.notes = data.notes || [];
  }

  create() {
    this.gameOverText = this.add.text(310, 100, 'Game Over', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.scoreText = this.add.text(0, 0, `Soil health restored: ${this.soilHealth}`, {
      fontSize: '32px',
      fill: '#fff',
    });

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 3,
      config.width,
      config.height,
    );

    Phaser.Display.Align.In.Center(this.scoreText, this.zone);

    // Ecology notes gathered this run, surfaced here at the natural beat
    if (this.notes.length > 0) {
      this.notesText = this.add
        .text(config.width / 2, 220, this.notes.join('\n\n'), {
          fontSize: '16px',
          fill: '#fff',
          align: 'center',
          wordWrap: { width: config.width - 120 },
        })
        .setOrigin(0.5, 0);
    }

    // Add form

    document.body.appendChild(createForm());

    // Save button

    this.saveButton = this.add.sprite(200, 500, 'blueButton1').setInteractive();
    this.saveText = this.add.text(200, 500, 'Save', {
      fontSize: '32px',
      fill: '#fff',
    });

    const that = this;
    this.saveButton.on('pointerdown', () => {
      const playerName = document.querySelector('[name = "name"]').value;
      const form = document.querySelector('.form-container');
      if (form !== null) {
        form.remove();
      }
      scoreBoard.setScore(playerName, that.soilHealth).then(() => {
        scoreBoard.getScores().then((result) => {
          that.scene.start('Scores', result);
        });
      });
    });

    this.saveButton.on(
      'pointerover',
      () => {
        this.saveButton.setTexture('blueButton2');
      },
    );

    this.saveButton.on(
      'pointerout',
      () => {
        this.saveButton.setTexture('blueButton1');
      },
    );

    Phaser.Display.Align.In.Center(this.saveText, this.saveButton);

    // Menu button

    this.menuButton = new Button(
      this,
      new Button(this, 600, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title'),
    );
  }
}

export { GameOverScene, createForm };
