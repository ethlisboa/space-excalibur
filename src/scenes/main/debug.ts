import { Avatar } from './avatar';
import { BaseMapScene } from './index';

export class DebugContainer extends Phaser.GameObjects.Container {

    private containerBackground?: Phaser.GameObjects.Rectangle;
    private debugText?: Phaser.GameObjects.Text;
    private fontStyle = { font: "10px Mono", fill: "#fca" };
    private gameTick = 0;

    constructor(scene: BaseMapScene) {
        super(scene);
        this.debugText = scene.add.text(0, 0, "nil", this.fontStyle);
        this.containerBackground = scene.add.rectangle(0, 0, 0, 0, 0x000);
        this.setPosition(0, 0);
        this.setSize(160, 120);
        this.add(this.containerBackground)
        this.add(this.debugText);
        this.setAlpha(0.5);
    }

    // updates the debug container on each tick
    public update(avatar: Avatar): void {
        this.gameTick++;

        // fabricates debug information string
        this.debugText?.setText(
            "Nym: Arthur\nPos: "
            + this.formatAvatarPosition(avatar)
            + "\nAge: "
            + this.gameTick
        );

        // aligns debug container with parent sprite
        this.setPosition(
            avatar.getBottomRight().x,
            avatar.getBottomRight().y
        );

        // matches container size with text dimensions
        if (this.debugText && this.containerBackground) {
            this.setSize(this.debugText.displayWidth, this.debugText.displayHeight);
            this.containerBackground.setSize(this.debugText.displayWidth, this.debugText.displayHeight);
        }
    }

    // formats a string with the sprites top left position
    formatAvatarPosition(avatar: Avatar): string {
        return ""
            + avatar.getTopLeft().x.toFixed(0).toString()
            + ","
            + avatar.getTopLeft().y.toFixed(0).toString();
    }
}
