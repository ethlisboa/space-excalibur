import { Scene } from "phaser";
import { Item, Button } from "./buttons";

export class MenuScene extends Scene {
    constructor() {
        super('menu-scene');
    }

    preload() {
        this.load.image('btn', 'assets/sprites/buttons/blank-btn.png')
        this.load.image('box-1', 'assets/sprites/box-1.png')
    }

    create(): void {
        this.add.existing(new Button(this, this.sys.game.canvas.width - 200, 50, "Connect"))
        this.add.existing(new Item(this, 50, 50))
    }
}