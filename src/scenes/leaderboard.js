import "phaser";
import Button from "../objects/button";
import config from "../config/config";

export default class ScoresScene extends Phaser.Scene {
  constructor() {
    super("Scores");
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.scoresText = this.add.text(0, 0, "Top Scores", {
      fontSize: "32px",
      fill: "#fff",
    });

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 6,
      config.width,
      config.height
    );

    Phaser.Display.Align.In.Center(this.scoresText, this.zone);

    // Menu button

    this.menuButton = new Button(
      this,
      new Button(this, 400, 500, "blueButton1", "blueButton2", "Menu", "Title")
    );
  }
}