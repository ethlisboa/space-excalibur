import { Scene } from 'phaser';

export class LoadingScene extends Scene {
  constructor() {
    super('loading-scene');
  }

  create(): void {
    console.log('Loading scene was created');
  }
}