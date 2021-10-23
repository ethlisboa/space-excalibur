import { Input, Scene } from 'phaser';

export class BaseMapScene extends Scene {
  private map?: Phaser.Tilemaps.Tilemap;
  private avatar?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  private isDebugging = true;
  private debugContainer?: Phaser.GameObjects.Container;
  private debugBackground?: Phaser.GameObjects.Rectangle;
  private debugText?: Phaser.GameObjects.Text;
  private debugWelcome = "Nym: Arthur";
  private debugFontStyle = { font: "10px Mono", fill: "#fca" };
  private gameTick = 0;

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

    // Avatar
    this.avatar = this.physics.add.sprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      'avatar'
    );
    this.avatar.setGravity(0, 0);
    this.avatar.setCollideWorldBounds(true);
    this.avatar.setInteractive({useHandCursor: true});
    this.avatar.on('pointerdown', () => {
      this.isDebugging = !this.isDebugging;
    });

    // Camera
    this.cameras.main.startFollow(this.avatar, true);
    this.cameras.main.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels, true);

    // Debugging
    if (this.isDebugging) {
      this.debugText = this.add.text(0, 0, "nil", this.debugFontStyle);
      this.debugBackground = this.add.rectangle(0,0,0,0,0x000);
      this.debugContainer = this.add.container(0, 0);
      this.debugContainer.setSize(160, 120);
      this.debugContainer.add(this.debugBackground)
      this.debugContainer.add(this.debugText);
      this.debugContainer.setAlpha(0.5);
    }
  }

  update(): void {
    this.gameTick++;

    // Avatar Movement
    const movementSpeed = 100;
    this.avatar?.setVelocityX(0);
    this.avatar?.setVelocityY(0);
    if(this.cursors?.up.isDown === true) {
      this.avatar?.setVelocityY(-movementSpeed);
    }
    if (this.cursors?.down.isDown === true) {
      this.avatar?.setVelocityY(movementSpeed);
    }
    if (this.cursors?.left.isDown === true) {
      this.avatar?.setVelocityX(-movementSpeed);
    }
    if (this.cursors?.right.isDown === true) {
      this.avatar?.setVelocityX(movementSpeed);
    }

    // Debugging
    this.debugContainer?.setVisible(this.isDebugging);
    if (this.isDebugging) {
      this.debugText?.setText(
        this.debugWelcome
        + "\nPos: "
        + this.getPositionXY()
        + "\nAge: "
        + this.gameTick
      );
      this.debugContainer?.setPosition(
        this.avatar?.getBottomRight().x,
        this.avatar?.getBottomRight().y
      );
      if (this.debugText) {
        this.debugBackground?.setSize(this.debugText.displayWidth, this.debugText.displayHeight);
      }
    }
  }

  getPositionXY(): string {
    return ""
      + this.avatar?.getTopLeft().x.toFixed(0).toString()
      + ","
      + this.avatar?.getTopLeft().y.toFixed(0).toString();
  }
}
