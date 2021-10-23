import { BaseMapScene } from "../index";
import { Planet } from './planet';

export function renderPlanets(scene: BaseMapScene) {
  const planetGroup = scene.add.group();

  // adds random planets
  for (let i = 0; i < 50; i++) {
    const x = Phaser.Math.Between(0, scene.map?.widthInPixels ?? 0);
    const y = Phaser.Math.Between(0, scene.map?.heightInPixels ?? 0);
    const planet = new Planet(scene, x, y, 'terrestrial');
    scene.add.existing(planet);
    planetGroup.add(planet);

    // adds moons in the viscinity of the planet
    addMoons(x, y, planetGroup, scene);
  }

  // adds random asteroids
  // for (let i = 0; i < 25; i++) {
  //   const x = Phaser.Math.Between(0, scene.map?.widthInPixels ?? 0);
  //   const y = Phaser.Math.Between(0, scene.map?.heightInPixels ?? 0);
  //   const asteroid = new Planet(scene, x, y, 'asteroid-fire');
  //   scene.add.existing(asteroid);
  //   planetGroup.add(asteroid);
  //}
}

// adds moons to a planet near (x, y)
function addMoons(x: number, y: number, group: Phaser.GameObjects.Group, scene: BaseMapScene): void {
  const maxMoonOffset = 150;
  const numMoons = Math.floor(Math.random() * 4);
  for (let i = 0; i < numMoons; i++) {
    const _x = Math.floor(x + (Math.random() * maxMoonOffset) - maxMoonOffset / 2);
    const _y = Math.floor(y + (Math.random() * maxMoonOffset) - maxMoonOffset / 2);
    const moon = new Planet(scene, _x, _y, 'moon');
    scene.add.existing(moon);
    group.add(moon);
  }
}

// import { Input } from "phaser";
// import { getWeb3Provider } from "../../actions/web3";
// import { BaseMapScene } from ".";

// export function renderPlanets(scene: BaseMapScene) {
//     const planetGroup = scene.add.group();
//     for (let i = 0; i < 100; i++) {
//         const planetSprite = scene.make.sprite({
//             key: 'planet-green',
//             x: Phaser.Math.Between(0, scene.map?.widthInPixels ?? 0),
//             y: Phaser.Math.Between(0, scene.map?.heightInPixels ?? 0)
//         }, true).setInteractive({
//             useHandCursor: true
//         });
//         planetSprite.on(Input.Events.POINTER_DOWN, async () => {
//             console.log("planet clicked")
//             const provider = await getWeb3Provider();
//             console.log("blockNumber", await provider.getBlockNumber())
//         })
//         planetGroup.add(planetSprite);
//     }
// }
