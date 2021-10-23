import { Avatar } from './avatar';
import { Input, Scene } from 'phaser';
import { renderPlanets } from './planets';

export class BaseMapScene extends Scene {
  public map?: Phaser.Tilemaps.Tilemap;
  public avatar?: Avatar;
  public cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

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
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.map.createLayer("space", spaceTileset, 0, 0);

    renderPlanets(this);

    // Avatar
    this.avatar = new Avatar(this);
    this.avatar.onClick(() => this.isDebugging = !this.isDebugging);
    this.physics.add.existing(this.avatar, false);

    // Debugging
    if (this.isDebugging) {
      this.debugText = this.add.text(0, 0, "nil", this.debugFontStyle);
      this.debugBackground = this.add.rectangle(0, 0, 0, 0, 0x000);
      this.debugContainer = this.add.container(0, 0);
      this.debugContainer.setSize(160, 120);
      this.debugContainer.add(this.debugBackground)
      this.debugContainer.add(this.debugText);
      this.debugContainer.setAlpha(0.5);
    }
  }

  update(): void {
    this.gameTick++;
    this.avatar?.update(this.cursors);

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
