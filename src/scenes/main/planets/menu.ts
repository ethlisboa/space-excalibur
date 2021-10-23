import { SpaceBaseScene } from "../index";

export class PlanetMenu extends Phaser.GameObjects.Container {
    constructor(scene: SpaceBaseScene, x: number, y: number) {
        super(
            scene,
            scene.game.canvas.width / 2,
            scene.game.canvas.height / 2
        );
    }
}
