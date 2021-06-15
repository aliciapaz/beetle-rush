import "phaser";
import config from "../config/config";
import Button from '../objects/button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.score = data.score;
    this.saved = false;
  }

  create() {
    this.gameOverText = this.add.text(0, 0, "Game Over", {
      fontSize: "32px",
      fill: "#fff",
    });

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height
    );

    Phaser.Display.Align.In.Center(this.gameOverText, this.zone);

    this.saveButton = new Button (this, new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title'))

    this.saveButton.on("pointerover", function (event, gameObjects) {
      this.setTexture("blueButton2");
    });

    this.saveButton.on("pointerout", function (event, gameObjects) {
      this.setTexture("blueButton1");
    });
  }
}
