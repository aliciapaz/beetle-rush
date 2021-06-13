import "phaser";

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super("Options");
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 100, "Options", { fontSize: 40 });
    this.musicButton = this.add.image(200, 200, "checkedBox");
    this.musicText = this.add.text(250, 190, "Music Enabled", { fontSize: 24 });

    this.soundButton = this.add.image(200, 300, "checkedBox");
    this.soundText = this.add.text(250, 290, "Sound Enabled", { fontSize: 24 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on(
      "pointerdown",
      function () {
        this.model.musicOn = !this.model.musicOn;
        this.updateAudio();
      }.bind(this)
    );

    this.soundButton.on(
      "pointerdown",
      function () {
        this.model.soundOn = !this.model.soundOn;
        this.updateAudio();
      }.bind(this)
    );

    this.updateAudio();

    this.menuButton = this.add.sprite(400, 500, "blueButton1").setInteractive();
    this.menuText = this.add.text(0, 0, "Menu", {
      fontSize: "32px",
      fill: "#fff",
    });
    Phaser.Display.Align.In.Center(this.menuText, this.menuButton);

    this.menuButton.on(
      "pointerdown",
      function (pointer) {
        this.scene.start("Title");
      }.bind(this)
    );

    this.menuButton.on("pointerover", function (event, gameObjects) {
      this.setTexture("blueButton2");
    });

    this.menuButton.on("pointerout", function (event, gameObjects) {
      this.setTexture("blueButton1");
    });
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture("box");
    } else {
      this.musicButton.setTexture("checkedBox");
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture("box");
    } else {
      this.soundButton.setTexture("checkedBox");
    }
  }
}
