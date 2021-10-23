import { Input } from 'phaser';
import { BaseMapScene } from '../index';

export class Planet extends Phaser.GameObjects.Sprite {
    public id: string;

    constructor(scene: BaseMapScene, x: number, y: number, texture: string) {
        super(scene, scene.game.canvas.width / 2,
            scene.game.canvas.height / 2, texture);
        scene.sys.displayList.add(this);
        scene.sys.updateList.add(this);
        this.id = this.newId();
        this.setInteractive({ useHandCursor: true });
        this.setPosition(x, y);
        this.setTexture(texture);
        this.on(Input.Events.POINTER_DOWN, () => console.log(texture + " " + this.id));
    }

    newId(): string {
        return (Math.random() * 1_000_000_000_000).toString(16).slice(0, 7);
    }
}
