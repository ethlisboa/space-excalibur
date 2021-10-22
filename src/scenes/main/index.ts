import { Scene } from 'phaser';

export class BaseMapScene extends Scene {
  private background?: Phaser.GameObjects.TileSprite;
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
    this.background = this.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'stars')
      .setOrigin(0)
      .setScrollFactor(0, 1);

    // Avatar
    this.avatar = this.physics.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, 'avatar');
    this.avatar.setGravity(0, 0);
  }

  update(): void {

    // Avatar Movement (Horizontal)
    let speed = 3;
    if (this.background && this.cursors?.left.isDown) {
      this.background.tilePositionX -= speed;
    } else if (this.background && this.cursors?.right.isDown) {
      this.background.tilePositionX += speed;
    }

    // Avatar Movement (Vertical)
    if (this.background && this.cursors?.up.isDown) {
      this.background.tilePositionY -= speed;
    } else if (this.background && this.cursors?.down.isDown) {
      this.background.tilePositionY += speed;
    }
  }
}
