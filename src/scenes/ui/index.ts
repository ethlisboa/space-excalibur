import { Scene } from 'phaser';
import { Inventory } from './inventory';

export class UIScene extends Scene {
  private inventory!: Inventory

  constructor() {
    super('ui-scene')
  }

  create(): void {
    this.inventory = new Inventory(this, 25, 50, []);
  }
}
