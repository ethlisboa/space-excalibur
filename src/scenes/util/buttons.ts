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
