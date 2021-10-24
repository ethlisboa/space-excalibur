import { Avatar } from './avatar';
import { Scene } from 'phaser';
import { renderPlanets } from './planets';
import { DebugContainer } from './debug';
import { renderInventory } from '../ui';

export class SpaceBaseScene extends Scene {
  public map?: Phaser.Tilemaps.Tilemap;
  public avatar?: Avatar;
  private isDebugging = false;
  private debugContainer?: DebugContainer;
  private spaceObjects?: Phaser.GameObjects.Group;
  private inventory?: Phaser.GameObjects.Group;

  constructor() {
    super('map-scene');
  }

  preload() {
    // Inventory Items
    this.load.image('BlackSteel', 'assets/sprites/BlackSteel.png');
    this.load.image('Charcoal', 'assets/sprites/Charcoal.png');
    this.load.image('EnergyCrystal', 'assets/sprites/EnergyCrystal.png');
    this.load.image('EpicOpal', 'assets/sprites/EpicOral.png');
    this.load.image('IronOre', 'assets/sprites/IronOre.png');
    this.load.image('PreciousDiamonds', 'assets/sprites/PreciousDiamonds.png');
    this.load.image('PureGraphite', 'assets/sprites/PureGraphite.png');
    this.load.image('RaccoonLeather', 'assets/sprites/RaccoonLeather.png');
    this.load.image('SaberHandle', 'assets/sprites/SaberHandle.png');
    this.load.image('SpaceRaccoon', 'assets/sprites/SpaceRaccoon.png');
    this.load.image('TerrestrialWood', 'assets/sprites/TerrestrialWood.png');

    // Celestials
    this.load.image('Asteroid', 'assets/sprites/Asteroid.png');
    this.load.image('Moon', 'assets/sprites/Moon.png');
    this.load.image('Planet', 'assets/sprites/Planet.png');
    this.load.image('SpaceOven', 'assets/sprites/Factory.png');

    // Others
    this.load.image('Avatar', 'assets/sprites/Avatar.png');
    this.load.image('space-tileset', 'assets/map/Tilesets/space-tileset.png');
    this.load.image('btn', 'assets/sprites/buttons/blank-btn.png');
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

    this.spaceObjects = this.add.group();
    // Random Planets
    renderPlanets(this, this.spaceObjects);

    // Inventory
    this.inventory = renderInventory(this);

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
