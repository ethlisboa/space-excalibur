import { Text } from './text';

export enum InventoryState {
  ITEMS_EQUIPPED,
  ITEM_IN_PROGRESS,
}

export class Inventory extends Text {
  private currentInventory: string[];

  constructor(scene: Phaser.Scene, x: number, y: number, initItem: string[] = [] ) {
    super(scene, x, y, `Inventory: empty.`);

    scene.add.existing(this);
    this.currentInventory = initItem
  }

  public setInventory(operation: InventoryState, items: string[]): void {
    switch (operation) {
      case InventoryState.ITEMS_EQUIPPED:
        this.currentInventory == items;
        break;
      case InventoryState.ITEM_IN_PROGRESS:
        this.currentInventory == ["Making a new item..."];
        break;
      default:
        break;
    }

    this.setText(`Inventory: ${this.currentInventory}`);
  }

  public getInventory(): string[] {
    return this.currentInventory;
  }
}