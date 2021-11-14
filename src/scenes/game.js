import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.isGameOver = false;
    this.score = 0;
    this.scoreText = '';
    this.playerJumps = 0; // number of consecutive jumps
    this.addedDung = 0; // keeps track of the added dung coins
    this.healthPoints = 100; // initial health points
  }

  create() {
    // Animate player
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('beetle', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });

    // Animate frogs
    this.anims.create({
      key: 'eat',
      frames: this.anims.generateFrameNumbers('frog', { start: 0, end: 9 }),
      frameRate: 6,
      repeat: -1,
    });

    // Add a scrolling background and ground
    this.background = this.add
      .tileSprite(400, 300, 800, 1200, 'background')
      .setScrollFactor(0, 1);
    this.platform = this.physics.add.staticGroup();
    this.platform.create(400, 580, 'platform');
    this.ground = this.add
      .tileSprite(400, 580, 800, 70, 'platform')
      .setScrollFactor(0, 1);

    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    });

    // Health bar
    const healthBar = this.add.graphics();
    const healthBox = this.add.graphics();
    healthBox.fillStyle(0x222222, 0.1);
    healthBox.fillRect(510, 16, 270, 30);
    healthBar.fillStyle(0x00ff23, 1);
    healthBar.fillRect(511, 17, 270, 28);

    // Update health bar
    this.updateHealthBar = (points) => {
      healthBar.clear();
      healthBar.fillStyle(0x00ff23, 1);
      healthBar.fillRect(511, 17, 270 * (points / 100), 28);
    };

    // Add beetle player
    this.player = this.physics.add.sprite(100, 255, 'beetle').setScale(2);
    this.player.setCollideWorldBounds(true);
    this.player.setSize(24.2);
    this.player.setDepth(2);
    this.player.body.setGravityY(900);

    // Make player to collide with platform
    this.physics.add.collider(
      this.player,
      this.platform,
      () => {
        if (!this.player.anims.isPlaying) {
          this.player.anims.play('run');
        }
      },
      null,
    );

    // Add dung coins
    this.dungGroup = this.physics.add.group({
      defaultKey: 'dung',
      maxSize: 15,
      visible: false,
      active: false,
    });

    // Add toxic dung
    this.toxicDungGroup = this.physics.add.group({
      defaultKey: 'toxicDung',
      maxSize: 15,
      visible: false,
      active: false,
    });

    // Take objects from the dung and toxic dung pool for use
    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => {
        const dungPositionY = Math.floor(Math.random() * 3);
        const random = Math.floor(Math.random() * 100) + 1;
        if (random >= 20) {
          this.dungGroup
            .get(820, [275, 375, 528][dungPositionY])
            .setActive(true)
            .setVisible(true)
            .setScale(0.1);
        } else {
          this.toxicDungGroup
            .get(820, [275, 375, 528][dungPositionY])
            .setActive(true)
            .setVisible(true)
            .setSize(4, 2)
            .setScale(0.1);
        }
      },
    });

    // Setting collisions between player and dung coins
    this.physics.add.overlap(
      this.player,
      this.dungGroup,
      (player, dung) => {
        this.dungGroup.killAndHide(dung);
        this.dungGroup.remove(dung);
        // Add and update the score
        this.score += 5;
        this.scoreText.setText(`Score: ${this.score}`);
      },
      null,
      this,
    );

    // Setting collisions between player and toxic dung coins
    this.physics.add.overlap(
      this.player,
      this.toxicDungGroup,
      (player, dung) => {
        this.toxicDungGroup.killAndHide(dung);
        this.toxicDungGroup.remove(dung);
        // Take healthpoints and update health bar
        this.healthPoints -= 5;
        this.updateHealthBar(this.healthPoints);
      },
      null,
      this,
    );

    // Add frog enemies
    this.frogGroup = this.physics.add.group({
      defaultKey: 'frog',
      maxSize: 10,
      visible: false,
      active: false,
    });

    // Take objects from the frog pool for use
    this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => {
        const frogPositionX = Phaser.Math.Between(850, 1600);
        this.frogGroup
          .get(frogPositionX, 510)
          .setActive(true)
          .setVisible(true)
          .setSize(8, 8)
          .setScale(3)
          .setDepth(2)
          .anims.play('eat');
      },
    });

    // Set collisions between player and frogs
    this.physics.add.overlap(
      this.player,
      this.frogGroup,
      () => {
        this.isGameOver = true;
      },
      null,
      this,
    );

    // Input keyboard events
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.healthPoints === 0) {
      this.isGameOver = true;
    }

    if (this.isGameOver === true) {
      this.scene.start('GameOver', { score: Phaser.Math.RoundTo(this.score, 0) });
    }

    this.background.tilePositionX += 1;
    this.ground.tilePositionX += 6;

    this.didJump = Phaser.Input.Keyboard.JustDown(this.cursors.up);

    if (this.didJump) {
      if (
        this.player.body.touching.down
        || (this.playerJumps > 0 && this.playerJumps < 2)
      ) {
        if (this.player.body.touching.down) {
          this.playerJumps = 0;
        }
        this.player.setVelocityY(500 * -1);
        this.playerJumps += 1;

        // stops animation
        this.player.anims.stop();
      }
    }
    this.dungGroup.incX(-6);
    this.dungGroup.getChildren().forEach((dungCoin) => {
      if (dungCoin.active && dungCoin.x < 0) {
        this.dungGroup.killAndHide(dungCoin);
      }
    });

    this.toxicDungGroup.incX(-6);
    this.toxicDungGroup.getChildren().forEach((dungCoin) => {
      if (dungCoin.active && dungCoin.x < 0) {
        this.toxicDungGroup.killAndHide(dungCoin);
      }
    });

    this.frogGroup.incX(-6);
    this.frogGroup.getChildren().forEach((frog) => {
      if (frog.active && frog.x < 0) {
        this.frogGroup.killAndHide(frog);
      }
    });
  }
}
