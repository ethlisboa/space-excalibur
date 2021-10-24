import { Avatar } from './avatar';
import { Scene } from 'phaser';
import { renderPlanets } from './planets';
import { DebugContainer } from './debug';

export class SpaceBaseScene extends Scene {
  public map?: Phaser.Tilemaps.Tilemap;
  public avatar?: Avatar;
  private isDebugging = false;
  private debugContainer?: DebugContainer;
  private spaceObjects?: Phaser.GameObjects.Group;

  constructor() {
    super('map-scene');
  }

  preload() {
    // Celestials
    this.load.image('Asteroid', 'assets/sprites/Asteroid.png');
    this.load.image('Moon', 'assets/sprites/Moon.png');
    this.load.image('Planet', 'assets/sprites/Planet.png');
    this.load.image('SpaceOven', 'assets/sprites/Factory.png');

    // Other Textures
    this.load.image('avatar', 'assets/sprites/avatar.png');
    this.load.image('space-tileset', 'assets/map/Tilesets/space-tileset.png');
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
  }


  create(): void {
    this.scene.launch("menu-scene");
    this.scene.launch("ui-scene");

    // Background
    this.map = this.make.tilemap({ key: 'map', tileWidth: 50, tileHeight: 50 });
    const spaceTileset = this.map.addTilesetImage('space', 'space-tileset');
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.map.createLayer("space", spaceTileset, 0, 0);

    // Celestials
    this.spaceObjects = this.add.group();
    renderPlanets(this, this.spaceObjects);

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
      this.avatar.update();

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
