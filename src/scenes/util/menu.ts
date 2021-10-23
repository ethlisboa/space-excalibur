import { Scene } from "phaser";
import { Item, Button } from "./buttons";
import { items } from "./test";

export class MenuScene extends Scene {
    constructor() {
        super('menu-scene');
    }

    preload() {
        this.load.image('btn', 'assets/sprites/buttons/blank-btn.png')
        this.load.image('box-1', 'assets/sprites/box-1.png')
        this.load.image('comet', 'assets/sprites/comet.png')
    }

    create(): void {
        this.add.existing(new Button(this, this.sys.game.canvas.width - 200, 50, "Connect"))

        for (let i = 0; i < items.length; i++) {
            this.add.existing(new Item(this, 50 + (60 * i), 50, items[i].quantity))
        }
    }
}