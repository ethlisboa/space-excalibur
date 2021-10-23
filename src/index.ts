import { Game, Types } from 'phaser';
import { SpaceBaseScene } from './scenes/main/index';

declare global {
    interface Window {
        sizeChanged: () => void;
        game: Phaser.Game;
     }
}

const gameConfig: Types.Core.GameConfig = {
	title: 'SpaceXcalibur',
  type: Phaser.WEBGL,
  parent: 'game',
  backgroundColor: 'black',
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  disableContextMenu: true,
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    },
  },
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [SpaceBaseScene],
};

window.sizeChanged = () => {
    if (window.game.isBooted) {
      setTimeout(() => {
        window.game.scale.resize(window.innerWidth, window.innerHeight);

        window.game.canvas.setAttribute(
          'style',
          `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
        );
      }, 100);
    }
  };

window.onresize = () => window.sizeChanged();

window.game = new Game(gameConfig);
