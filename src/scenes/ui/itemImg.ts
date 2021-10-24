import { SpaceBaseScene } from '../index';

export const itemsMenu = [
  "IronOre",
  "TerrestrialWood",
  "SpaceRaccoon",
  "Charcoal",
  "Graphite",
  "BlackSteel",
  "PureDiamonds",
  "RaccoonLeather",
  "SaberHandle",
  "EnergyCrystal",
  "EpicOpal",
]

export class ItemImg extends Phaser.GameObjects.Sprite {

  constructor(scene: SpaceBaseScene, x: number, y: number, texture: string) {
    super(
      scene,
      scene.game.canvas.width / 2,
      scene.game.canvas.height / 2,
      texture
    );
    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);

    this.setPosition(x, y);
    if (this.texture.key in itemsMenu) {
      this.setTexture(texture);
    }
  }
}
