import { Scene } from "phaser";
import { Button } from "./buttons";

export class MenuScene extends Scene {
    constructor() {
        super('menu-scene');
    }

    preload() {
        this.load.image('btn', 'assets/sprites/buttons/blank-btn.png')
    }

    create(): void {
        this.add.existing(new Button(this, this.sys.game.canvas.width - 200, 50, "Connect"))
    }

}