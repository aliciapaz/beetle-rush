import Phaser from 'phaser';
import config from '../config/config';
import { Button } from '../objects/button';
import * as scoreBoard from '../api';

const createForm = () => {
  const formContainer = document.createElement('form');
  formContainer.className = 'form-container';

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Enter your name';

  const nameInput = document.createElement('input');
  nameInput.setAttribute('name', 'name');

  formContainer.appendChild(nameLabel);
  formContainer.appendChild(nameInput);
  return formContainer;
};

const displayError = (error) => {
  const errors = document.getElementById('error-container');
  errors.innerHTML = error;
  errors.style.display = 'block';
  setTimeout(() => { errors.style.display = 'none'; }, 3000);
};

class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.gameOverText = this.add.text(310, 100, 'Game Over', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.scoreText = this.add.text(0, 0, `Your score: ${this.score}`, {
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
      scoreBoard.setScore(playerName, that.score).then(() => {
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

export { GameOverScene, createForm, displayError };
