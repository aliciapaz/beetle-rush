import Phaser from 'phaser';
import config from '../config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '32px',
      fill: '#fff',
    });
    this.madeByText = this.add.text(0, 0, 'Created By: Alicia Rojas', {
      fontSize: '26px',
      fill: '#fff',
    });
    this.portfolioText = this.add.text(0, 0, 'https://www.aliciarojas.me', {
      fontSize: '26px',
      fill: '#fff',
    });
    this.musicByText = this.add.text(0, 0, 'Music by Matthew Pablo', {
      fontSize: '26px',
      fill: '#fff',
    }); //
    this.musicSiteText = this.add.text(0, 0, 'http://www.matthewpablo.com', {
      fontSize: '26px',
      fill: '#fff',
    });

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );

    Phaser.Display.Align.In.Center(this.creditsText, this.zone);
    Phaser.Display.Align.In.Center(this.madeByText, this.zone);
    Phaser.Display.Align.In.Center(this.portfolioText, this.zone);
    Phaser.Display.Align.In.Center(this.musicByText, this.zone);
    Phaser.Display.Align.In.Center(this.musicSiteText, this.zone);

    this.madeByText.setY(1000);
    this.portfolioText.setY(1050);
    this.musicByText.setY(1200);
    this.musicSiteText.setY(1250);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 2000,
      delay: 1000,
      onComplete() {
        // eslint-disable-next-line
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 6000,
      delay: 1000,
      onComplete() {
        // eslint-disable-next-line
        this.destroy;
      },
    });

    this.portfolioTween = this.tweens.add({
      targets: this.portfolioText,
      y: -300,
      ease: 'Power1',
      duration: 7000,
      delay: 1500,
      onComplete() {
        // eslint-disable-next-line
        this.destroy;
      },
    });

    this.musicByText = this.tweens.add({
      targets: this.musicByText,
      y: -300,
      ease: 'Power1',
      duration: 7000,
      delay: 3000,
      onComplete() {
        // eslint-disable-next-line
        this.destroy;
      },
    });

    this.musicByText = this.tweens.add({
      targets: this.musicSiteText,
      y: -300,
      ease: 'Power1',
      duration: 7000,
      delay: 3500,
      // eslint-disable-next-line
      onComplete: function () {
        // eslint-disable-next-line
        this.musicByText.destroy;
        this.scene.start('Title');
      }.bind(this),
    });
  }
}
