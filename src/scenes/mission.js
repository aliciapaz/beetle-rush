import Phaser from 'phaser';
import config from '../config/config';
import { Button } from '../objects/button';
import MISSION_COPY from '../config/mission';

export default class MissionScene extends Phaser.Scene {
  constructor() {
    super('Mission');
  }

  create() {
    this.titleText = this.add
      .text(config.width / 2, 70, 'Why this game exists', {
        fontSize: '32px',
        fill: '#fff',
      })
      .setOrigin(0.5, 0);

    this.copyText = this.add
      .text(config.width / 2, 160, MISSION_COPY, {
        fontSize: '18px',
        fill: '#fff',
        align: 'center',
        wordWrap: { width: config.width - 120 },
      })
      .setOrigin(0.5, 0);

    this.menuButton = new Button(
      this,
      config.width / 2,
      config.height - 80,
      'blueButton1',
      'blueButton2',
      'Menu',
      'Title',
    );
  }
}
