import { SpaceBaseScene } from '../index';
import { ItemImg } from './itemImg';
import { itemsMenu } from './test';

export function renderInventory(scene: SpaceBaseScene): Phaser.GameObjects.Group {

  const itemsGroup = scene.add.group();
  for (let i = 0; i < itemsMenu.length; i++) {
    const x = Phaser.Math.Between(0, scene.map?.widthInPixels ?? 0);
    const y = Phaser.Math.Between(0, scene.map?.heightInPixels ?? 0);
    const itemSprite = new ItemImg(scene, x, y, itemsMenu[i].name)

    scene.add.existing(itemSprite)
    itemsGroup.add(itemSprite);
  }
  return itemsGroup;
}
