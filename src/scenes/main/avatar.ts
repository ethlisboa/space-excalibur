import { Physics } from "phaser";
import { SpaceBaseScene } from './index';

export class Avatar extends Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wKey: Phaser.Input.Keyboard.Key;
    private aKey: Phaser.Input.Keyboard.Key;
    private sKey: Phaser.Input.Keyboard.Key;
    private dKey: Phaser.Input.Keyboard.Key;
    private spaceKey: Phaser.Input.Keyboard.Key;

    constructor(scene: SpaceBaseScene) {
        super(scene, scene.game.canvas.width / 2,
            scene.game.canvas.height / 2, 'avatar')
        scene.sys.displayList.add(this);
        scene.sys.updateList.add(this);
        scene.physics.world.enableBody(this, Physics.Arcade.DYNAMIC_BODY)
        this.setGravity(0, 0);
        this.setCollideWorldBounds(true);
        this.setInteractive({ useHandCursor: true });


        // Input Keys
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Camera
        scene.cameras.main.startFollow(this, true);
        scene.cameras.main.setBounds(0, 0, scene.map!.widthInPixels, scene.map!.heightInPixels, true);
    }

    onClick(callback: () => void): void {
        this.on('pointerdown', () => {
            callback()
        });
    }

    update(): void {
        // Avatar Movement
        const movementSpeed = 100;
        this.setVelocityX(0);
        this.setVelocityY(0);
        if (this.cursors.up.isDown === true || this.wKey.isDown === true) {
            this.setVelocityY(-movementSpeed);
        }
        if (this.cursors.down.isDown === true || this.sKey.isDown === true) {
            this.setVelocityY(movementSpeed);
        }
        if (this.cursors.left.isDown === true || this.aKey.isDown === true) {
            this.setVelocityX(-movementSpeed);
        }
        if (this.cursors.right.isDown === true || this.dKey.isDown === true) {
            this.setVelocityX(movementSpeed);
        }
        if (this.spaceKey.isDown === true) {
            this.setAngle(this.angle + Math.random() * 17);
            this.setScale(this.scale * 1.01);
        } else {
            this.setScale(Math.max(this.scale * 0.99, 1.0));
        }

        console.log(this.angle);
    }
}
