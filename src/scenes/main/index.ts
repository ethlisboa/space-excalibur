import { Scene } from 'phaser';

export class BaseMapScene extends Scene {
  private map?: Phaser.Tilemaps.Tilemap;
  private avatar?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  private isDebugging = true;
  private debugText?: Phaser.GameObjects.Text;
  private debugWelcome = "SpaceXcalibur\n";

  constructor() {
    super('map-scene');
  }

  preload() {
    this.load.image('avatar', 'assets/sprites/avatar.png')
    this.load.image('space-tileset', 'assets/map/Tilesets/space-tileset.png');
    this.load.image('planet', 'assets/map/Tilesets/planet.png');
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
  }

  create(): void {

    // Input Keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Background
    // this.background = this.add
    //   .tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'stars')
    //   .setOrigin(0)
    //   .setScrollFactor(0, 1);

    this.map = this.make.tilemap({key: 'map', tileWidth: 50, tileHeight: 50});
    const spaceTileset = this.map.addTilesetImage('space', 'space-tileset')
    const planetsTileset = this.map.addTilesetImage('planet', 'planet')
    const spaceLayer = this.map.createLayer("space", spaceTileset, 0, 0);
    const planetLayer = this.map.createLayer("planets", planetsTileset, 0, 0);


    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // Avatar
    this.avatar = this.physics.add.sprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      'avatar'
    );

    this.avatar.setGravity(0, 0);
    this.avatar.setCollideWorldBounds(true);

    this.cameras.main.startFollow(this.avatar, true)
    this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels, true);

    // Debugging
    if (this.isDebugging) {
      this.debugText = this.add.text(0, 0, this.debugWelcome + this.getPositionXY())
    }
  }

  update(): void {

    // Avatar Movement 
    this.avatar?.setVelocityX(0);
    this.avatar?.setVelocityY(0);

    if(this.cursors?.up.isDown === true) {
      this.avatar?.setVelocityY(-100);
    }
    if (this.cursors?.down.isDown === true) {
      this.avatar?.setVelocityY(100);
    }
    if (this.cursors?.left.isDown === true) {
      this.avatar?.setVelocityX(-100);
    }
    if (this.cursors?.right.isDown === true) {
      this.avatar?.setVelocityX(100);
    }

    // Debugging
    if (this.isDebugging) {
      this.debugText?.setText(this.debugWelcome + this.getPositionXY())
    }
  }

  getPositionXY(): string {
    return "";
    // return "TilePosition: " + this.background?.tilePositionX.toString() + "," + this.background?.tilePositionY.toString();
  }
}
