import { Input, Scene } from 'phaser';

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
    this.load.image('planet-green', 'assets/sprites/planet_green.png')
    this.load.image('space-tileset', 'assets/map/Tilesets/space-tileset.png');
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
  }

  create(): void {

    // Input Keys
    this.cursors = this.input.keyboard.createCursorKeys();

    this.map = this.make.tilemap({ key: 'map', tileWidth: 50, tileHeight: 50 });
    const spaceTileset = this.map.addTilesetImage('space', 'space-tileset')
    this.map.createLayer("space", spaceTileset, 0, 0);

    const planetGroup = this.add.group();
    for (let i = 0; i < 100; i++) {
      const planetSprite = this.make.sprite({ 
        key: 'planet-green',
        x: Phaser.Math.Between(0, this.map.widthInPixels),
        y: Phaser.Math.Between(0, this.map.heightInPixels) 
      }, true).setInteractive({
        useHandCursor: true
      });
      planetSprite.on(Input.Events.POINTER_DOWN, () => console.log("planet clicked"))
      planetGroup.add(planetSprite);
    }


    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    // Avatar
    this.avatar = this.physics.add.sprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      'avatar'
    ).setInteractive({ useHandCursor: true });
    this.avatar.on('pointerdown', function () {

      console.log("avatar clicked");

    });
    this.avatar.setGravity(0, 0);
    this.avatar.setCollideWorldBounds(true);


    this.cameras.main.startFollow(this.avatar, true)
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels, true);

    // Debugging
    if (this.isDebugging) {
      this.debugText = this.add.text(0, 0, this.debugWelcome + this.getPositionXY())
    }
  }

  update(): void {

    // Avatar Movement 
    this.avatar?.setVelocityX(0);
    this.avatar?.setVelocityY(0);

    if (this.cursors?.up.isDown === true) {
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
    return "TilePosition: " + this.avatar?.getCenter().x.toString() + "," + this.avatar?.getCenter().y.toString();
  }
}
