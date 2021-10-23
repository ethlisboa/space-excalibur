import { Console } from "console";
import { Scene, GameObjects, Input } from "phaser";

export class Button extends Phaser.GameObjects.Container {

    private bg: GameObjects.Image;
    private txt: GameObjects.Text;

    constructor(scene: Scene, x: number, y: number, txt: string) {
        super(scene, x, y);
        this.setSize(200, 50);
        this.bg = new GameObjects.Image(scene, 0, 0, 'btn');
        this.bg.tint = 0xffffff;
        this.add(this.bg)
        this.txt = new GameObjects.Text(scene, -20, -6, txt, { fontSize: "large", align: "center", testString: txt })
        this.add(this.txt);
        this.enable();
    }

    public onClick(callback: () => {}): void {
        this.on(Input.Events.POINTER_DOWN, callback);
    }

    public disable() {
        this.removeInteractive();
        this.off(Input.Events.POINTER_DOWN, this.toggle)
    }

    public enable() {
        this.setInteractive({ useHandCursor: true }, () => console.log("Interacted"))
        this.on(Input.Events.POINTER_DOWN, this.toggle)
    }

    public setText(txt: string) {
        this.txt.setText(txt);
        if (this.txt.width > this.width) {
            this.txt.setFontSize(13)
        }
        this.txt.setPosition(-1 * (this.txt.width / 2), -6);
    }

    private toggle = () => {
        this.bg.setVisible(false);
        setTimeout(() => this.bg.setVisible(true), 300);
    }
}

// add items[], count and add item picture on top of bg.
export class Item extends Phaser.GameObjects.Container {
    private fontStyle = { font: "10px Mono", fill: "#fca" };
    public quantity = "0";
    constructor(scene: Scene, x: number, y: number, quantity: string) {
        super(scene, x, y);
        this.setSize(50, 50);
        const bg = new GameObjects.Image(scene, 0, 0, 'box-1');
        this.add(bg);
        let ground = new GameObjects.Image(scene, 0, 0, 'comet');
        this.add(ground)
        let printQuantity = new GameObjects.Text(scene, 0, 20, quantity, { fontSize: "10px" });
        this.add(printQuantity);
        this.setInteractive({ useHandCursor: true })
        this.on(Input.Events.POINTER_DOWN, () => {
            console.log("clicked");
        })
    }
}
