import "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.score = 0;
    this.scoreText = "";
    this.playerJumps = 0;
  }

  create() {
    // Make Background, Ground and score dashboard
    this.background = this.add.tileSprite(400,300,800,1200,"background").setScrollFactor(0,1)
    this.ground = this.add.tileSprite(400,580,800,70, 'platform').setScrollFactor(0,1)

    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

  }

  update () {
    this.background.tilePositionX += 1;
    this.ground.tilePositionX += 2;

 }
}
