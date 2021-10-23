import { Input } from 'phaser';
import { SpaceBaseScene } from '../index';
import { PlanetMenu } from './menu';

export class Planet extends Phaser.GameObjects.Sprite {
    public id: string;
    public infoBox: PlanetMenu;

    constructor(scene: SpaceBaseScene, x: number, y: number, texture: string) {
        super(
            scene,
            scene.game.canvas.width / 2,
            scene.game.canvas.height / 2,
            texture
        );
        scene.sys.displayList.add(this);
        scene.sys.updateList.add(this);

        this.id = this.newId();
        this.infoBox = new PlanetMenu(scene, this.getBottomRight().x, this.getBottomRight().y);

        this.setInteractive({ useHandCursor: true });
        this.setPosition(x, y);
        this.setTexture(texture);
        this.on(Input.Events.POINTER_DOWN, () => console.log(texture + " " + this.id));
    }

    newId(): string {
        return (Math.random() * 1_000_000_000_000).toString(16).slice(0, 7);
    }
}
