import { Scene } from 'phaser';

export class BaseMapScene extends Scene {
  constructor() {
    super('map-scene');
  }

  preload() {
    this.load.image('stars', 'assets/bg/stars.png');
  }

  create(): void {
    console.log(this.game.canvas.width, this.game.canvas.height);
    this.add.tileSprite(0, 0, this.game.canvas.width * 2, this.game.canvas.height * 2, 'stars').setOrigin(0)
      .setScrollFactor(0, 1);
  }
}