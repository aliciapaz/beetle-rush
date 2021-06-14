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
    // Add a scrolling background and ground
    this.background = this.add
      .tileSprite(400, 300, 800, 1200, "background")
      .setScrollFactor(0, 1);
    this.platform = this.physics.add.staticGroup();
    this.platform.create(400, 580, "platform");
    this.ground = this.add
    .tileSprite(400, 580, 800, 70, "platform")
    .setScrollFactor(0, 1);

    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    // Add player
    this.player = this.physics.add.sprite(100, 255, "beetle").setScale(2);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.15);
    this.player.body.setGravityY(900);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('beetle', { start: 0, end: 2}),
      frameRate: 8,
      repeat: -1,
    });

    this.physics.add.collider(this.player, this.platform, () => {
      if (!this.player.anims.isPlaying) {
        this.player.anims.play('run');
      }
    }, null);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.canDoubleJump;

    // Add enemies
    //this.frog = this.physics.add.sprite(100, 255, "frog").setScale(3);
  }

  update() {
    this.background.tilePositionX += 1;
    this.ground.tilePositionX += 2;

    this.didJump = Phaser.Input.Keyboard.JustDown(this.cursors.up);

    if(this.didJump) {
      if (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < 2)) {
        if (this.player.body.touching.down) {
          this.playerJumps = 0;
        }
        this.player.setVelocityY(500 * -1);
        this.playerJumps += 1;
      
        // stops animation
        this.player.anims.stop();
      }
    }
  }
}