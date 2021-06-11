import "phaser";
import config from "../config/config";

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super("Credits");
  }

  preload() {}

  create() {
    this.creditsText = this.add.text(0, 0, "Credits", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.madeByText = this.add.text(0, 0, "Created By: Alicia Rojas", {
      fontSize: "26px",
      fill: "#fff",
    });
    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height
    );

    Phaser.Display.Align.In.Center(this.creditsText, this.zone);

    Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: "Power2",
      duration: 3000,
      delay: 1000,
      onComplete: function () {
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: "Power2",
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start("Title");
      }.bind(this),
    }); 
  }
}
