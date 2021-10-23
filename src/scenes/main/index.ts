import { Button, Item } from '../util/buttons';
import { Avatar } from './avatar';
import { Input, Scene } from 'phaser';
import { renderPlanets } from './planets';
import { DebugContainer } from './debug';

export class BaseMapScene extends Scene {
  public map?: Phaser.Tilemaps.Tilemap;
  public avatar?: Avatar;
  public cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  private isDebugging = true;
  private debugContainer?: DebugContainer;

  constructor() {
    super('map-scene');
  }

  preload() {
    this.load.image('avatar', 'assets/sprites/avatar.png')
    this.load.image('btn', 'assets/sprites/buttons/blank-btn.png')
    this.load.image('planet-green', 'assets/sprites/planet_green.png')
    this.load.image('space-tileset', 'assets/map/Tilesets/space-tileset.png');
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
  }

  create(): void {
    this.scene.launch("menu-scene");

    // Input Keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Background
    this.map = this.make.tilemap({ key: 'map', tileWidth: 50, tileHeight: 50 });
    const spaceTileset = this.map.addTilesetImage('space', 'space-tileset')
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.map.createLayer("space", spaceTileset, 0, 0);

    // Random Planets
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
    renderPlanets(this);

    // Avatar
    this.avatar = new Avatar(this);
    this.avatar.onClick(() => this.isDebugging = !this.isDebugging);
    this.physics.add.existing(this.avatar, false);

    // Debugging
    if (this.isDebugging) {
      this.debugContainer = new DebugContainer(this);
      this.add.existing(this.debugContainer);
    }
  }

  update(): void {
    if (this.avatar) {

      // updates the avatar movement
      this.avatar.update(this.cursors);

      // updates the debug container
      if (this.debugContainer) {
        this.debugContainer.setVisible(this.isDebugging);
        if (this.isDebugging) {
          this.debugContainer.update(this.avatar);
        }
      }
    }
  }
}
