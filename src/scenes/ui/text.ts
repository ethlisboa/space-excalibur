import { GameObjects, Scene } from 'phaser';

export class Text extends GameObjects.Text {
  constructor(scene: Scene, x: number, y: number, text: string) {
    super(scene, x, y, text, {
      fontSize: '24px',
      fontFamily: "Arial",
      color: '#fff',
      wordWrap: {
        width: 200
      },
    });

    this.setOrigin(0, 0);

    scene.add.existing(this);
  }
}