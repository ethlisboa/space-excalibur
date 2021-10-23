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

// add items[], count and add item picture on top of bg.
export class Item extends Phaser.GameObjects.Container {
    private fontStyle = { font: "10px Mono", fill: "#fca" };
    public quantity = "0";
    constructor(scene: Scene, x: number, y: number, quantity:string) {
        super(scene, x, y);
        this.setSize(50, 50);
        const bg = new GameObjects.Image(scene, 0, 0, 'box-1');
        this.add(bg);
        let ground = new GameObjects.Image(scene, 0, 0, 'comet');
        this.add(ground) 
        let printQuantity = new GameObjects.Text(scene, 0, 20, quantity, {fontSize: "10px"});
        this.add(printQuantity);
        this.setInteractive({useHandCursor: true})
        this.on(Input.Events.POINTER_DOWN, () => {
            console.log("clicked");
        })
    }
}