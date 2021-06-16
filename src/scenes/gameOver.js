import "phaser";
import config from "../config/config";
import Button from "../objects/button";
import * as scoreBoard from "../api";

class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.gameOverText = this.add.text(0, 0, "Game Over", {
      fontSize: "32px",
      fill: "#fff",
    });

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 4,
      config.width,
      config.height
    );

    Phaser.Display.Align.In.Center(this.gameOverText, this.zone);

    // Add form

    document.body.appendChild(createForm());

    // Save button

    this.saveButton = this.add.sprite(200, 500, "blueButton1").setInteractive();
    this.saveText = this.add.text(200, 500, "Save", {
      fontSize: "32px",
      fill: "#fff",
    });

    const that = this;
    this.saveButton.on("pointerdown", function () {
      const playerName = document.querySelector('[name = "name"]').value;
      const form = document.querySelector(".form-container");
      if (form != undefined) {
        form.remove();
      }
      scoreBoard.setScore(playerName, that.score);
      scoreBoard.getScores().then((result) => {
        that.scene.start("Scores", result);
      });
    });

    this.saveButton.on(
      "pointerover",
      function () {
        this.saveButton.setTexture("blueButton2");
      }.bind(this)
    );

    this.saveButton.on(
      "pointerout",
      function () {
        this.saveButton.setTexture("blueButton1");
      }.bind(this)
    );

    Phaser.Display.Align.In.Center(this.saveText, this.saveButton);

    // Menu button

    this.menuButton = new Button(
      this,
      new Button(this, 600, 500, "blueButton1", "blueButton2", "Menu", "Title")
    );
  }
}

const createForm = () => {
  const formContainer = document.createElement("form");
  formContainer.className = "form-container";

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Enter your name";

  const nameInput = document.createElement("input");
  nameInput.setAttribute("name", "name");

  formContainer.appendChild(nameLabel);
  formContainer.appendChild(nameInput);
  return formContainer;
};

export { GameOverScene, createForm };
