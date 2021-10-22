import { Scene } from 'phaser';

export class BaseMapScene extends Scene {
  private avatar?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('map-scene');
  }

  preload() {
    this.load.image('stars', 'assets/bg/stars.png');
    this.load.image('avatar', 'assets/sprites/avatar.png')
  }

  create(): void {

    // Input Keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Background
    this.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'stars')
      .setOrigin(0)
      .setScrollFactor(0, 1);

    // Avatar
    this.avatar = this.physics.add.sprite(150, 120, 'avatar');
    this.avatar.setGravity(0, 0);
  }

  update(): void {

    // Avatar Movement (Horizontal)
    let speed = 160;
    if (this.cursors?.left.isDown) {
      this.avatar?.setVelocityX(-speed);
    } else if (this.cursors?.right.isDown) {
      this.avatar?.setVelocityX(speed);
    } else {
      this.avatar?.setVelocityX(0);
    }

    // Avatar Movement (Vertical)
    if (this.cursors?.up.isDown) {
      this.avatar?.setVelocityY(-speed);
    } else if (this.cursors?.down.isDown) {
      this.avatar?.setVelocityY(speed);
    } else {
      this.avatar?.setVelocityY(0);
    }
  }
}
