import { SpaceBaseScene } from "../index";
import { Planet } from './planet';

export class PlanetMenu extends Phaser.GameObjects.Container {
    private containerBackground: Phaser.GameObjects.Rectangle;
    private menuText: Phaser.GameObjects.Text;
    private fontStyle = { font: "20px Mono", fill: "#ddd" };

    constructor(scene: SpaceBaseScene, x: number, y: number, parent: Planet) {
        super(scene, x, y);
        this.containerBackground = scene.add.rectangle(0, 0, 0, 0, 0x000);
        const text = parent.texture.key.toString() + " " + parent.id;
        this.menuText = scene.add.text(0, 0, text, this.fontStyle);

        this.setPosition(x, y);
        this.add(this.containerBackground);
        this.add(this.menuText);
        this.setVisible(false);

        this.setSize(this.menuText.displayWidth, this.menuText.displayHeight);
        this.containerBackground.setSize(this.menuText.displayWidth, this.menuText.displayHeight);
        this.containerBackground.setStrokeStyle(2, 0xf0c0a0);

        scene.add.existing(this);
    }
}
