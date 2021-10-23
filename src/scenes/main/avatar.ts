import { Physics } from "phaser";
import { BaseMapScene } from '.';

export class Avatar extends Physics.Arcade.Sprite {

    constructor(scene: BaseMapScene) {
        super(scene, scene.game.canvas.width / 2,
            scene.game.canvas.height / 2, 'avatar')
        scene.sys.displayList.add(this);
        scene.sys.updateList.add(this);
        scene.physics.world.enableBody(this, Physics.Arcade.DYNAMIC_BODY)
        this.setGravity(0, 0);
        this.setCollideWorldBounds(true);
        this.setInteractive({ useHandCursor: true });
        // Camera
        scene.cameras.main.startFollow(this, true);
        scene.cameras.main.setBounds(0, 0, scene.map!.widthInPixels, scene.map!.heightInPixels, true);
    }

    onClick(callback: () => void): void {
        this.on('pointerdown', () => {
            callback()
        });
    }

    update(cursors?: Phaser.Types.Input.Keyboard.CursorKeys): void {
        // Avatar Movement
        const movementSpeed = 100;
        this.setVelocityX(0);
        this.setVelocityY(0);
        if (cursors?.up.isDown === true) {
            this.setVelocityY(-movementSpeed);
        }
        if (cursors?.down.isDown === true) {
            this.setVelocityY(movementSpeed);
        }
        if (cursors?.left.isDown === true) {
            this.setVelocityX(-movementSpeed);
        }
        if (cursors?.right.isDown === true) {
            this.setVelocityX(movementSpeed);
        }
    }

}