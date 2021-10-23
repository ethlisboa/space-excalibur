import { Console } from "console";
import { Scene, GameObjects, Input } from "phaser";

export class Button extends Phaser.GameObjects.Container {

    constructor(scene: Scene, x: number, y: number, txt: string) {
        super(scene, x, y);
        this.setSize(100, 50);
        const bg = new GameObjects.Image(scene, 0, 0, 'btn');
        bg.tint = 0xffffff;
        this.add(bg)
        this.add(new GameObjects.Text(scene, -20, -6, txt, { fontSize: "large", align: "center", testString: txt }))
        this.setInteractive({useHandCursor: true})
        this.on(Input.Events.POINTER_DOWN, () => {
            console.log("clicked");
            bg.setVisible(false);
            this.removeInteractive();
            setTimeout(() => bg.setVisible(true), 300);
        })
    }

}