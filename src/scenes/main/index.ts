import { Button } from '../util/buttons';
import { Avatar } from './avatar';
import { Scene } from 'phaser';
import { renderPlanets } from './planets';
import { DebugContainer } from './debug';

export class SpaceBaseScene extends Scene {
  public map?: Phaser.Tilemaps.Tilemap;
  public avatar?: Avatar;
  public cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  private isDebugging = false;
  private debugContainer?: DebugContainer;
  private spaceObjects?: Phaser.GameObjects.Group;

  constructor() {
    super('map-scene');
  }

  preload() {
    this.load.image('btn', 'assets/sprites/buttons/blank-btn.png')
    this.load.image('asteroid-black', 'assets/sprites/asteroid-black.png');
    this.load.image('asteroid-fire', 'assets/sprites/asteroid-fire.png');
    this.load.image('avatar', 'assets/sprites/avatar.png');
    this.load.image('moon', 'assets/sprites/moon.png');
    this.load.image('planet-blue', 'assets/sprites/planet-blue.png');
    this.load.image('planet-green', 'assets/sprites/planet-green.png');
    this.load.image('planet-orange', 'assets/sprites/planet-orange.png');
    this.load.image('terrestrial', 'assets/sprites/terrestrial.png');
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
    this.spaceObjects = renderPlanets(this);

    // Avatar
    this.avatar = new Avatar(this);
    this.avatar.onClick(() => this.isDebugging = !this.isDebugging);
    this.physics.add.existing(this.avatar, false);

    // Debugging
      this.debugContainer = new DebugContainer(this);
      this.add.existing(this.debugContainer);
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

    // rotates all planets
    if (this.spaceObjects) {
      this.spaceObjects.angle(Math.random());
    }
  }
}
