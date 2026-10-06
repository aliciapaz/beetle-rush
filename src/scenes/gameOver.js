import Phaser from 'phaser';
import config from '../config/config';
import Button from '../objects/button';

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

    this.soilHealthText = this.add.text(0, 0, `Soil health restored: ${this.soilHealth}`, {
      fontSize: '32px',
      fill: '#fff',
    });

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 3,
      config.width,
      config.height,
    );

    Phaser.Display.Align.In.Center(this.soilHealthText, this.zone);

    // Ecology notes gathered this run, surfaced first; dismissing them
    // reveals the menu button
    if (this.notes.length > 0) {
      this.showNotes();
    } else {
      this.showMenuButton();
    }
  }

  showNotes() {
    const notesText = this.add
      .text(config.width / 2, 220, this.notes.join('\n\n'), {
        fontSize: '16px',
        fill: '#fff',
        align: 'center',
        wordWrap: { width: config.width - 120 },
      })
      .setOrigin(0.5, 0);

    const continueButton = this.add
      .sprite(config.width / 2, config.height - 60, 'blueButton1')
      .setInteractive();
    const continueText = this.add.text(0, 0, 'Continue', {
      fontSize: '24px',
      fill: '#fff',
    });
    Phaser.Display.Align.In.Center(continueText, continueButton);

    continueButton.on('pointerover', () => continueButton.setTexture('blueButton2'));
    continueButton.on('pointerout', () => continueButton.setTexture('blueButton1'));
    continueButton.on('pointerdown', () => {
      [notesText, continueButton, continueText].forEach((item) => item.destroy());
      this.showMenuButton();
    });
  }

  showMenuButton() {
    // Menu button

    this.menuButton = new Button(
      this,
      new Button(this, config.width / 2, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title'),
    );
  }
}

export default GameOverScene;
