import { getWeb3Provider } from '../../../actions/web3';
import { SpaceBaseScene } from "../index";
import { Planet } from './planet';
import { Galaxy } from 'spacexcalibur-contracts/typechain/Galaxy';
import { Contract } from 'ethers';
import { GameObjects } from 'phaser';


const { abi: GalaxyABI, address: galaxyAddress } = require('spacexcalibur-contracts/deployments/optimistic/Galaxy.json');

export async function renderPlanets(scene: SpaceBaseScene, group: GameObjects.Group): Promise<void> {
  const provider = getWeb3Provider();
  const contract = new Contract(galaxyAddress, GalaxyABI, provider) as Galaxy;
  for (let i = 0; i <= 10; i++) {
    try {
      const celestial = await contract.map(i);
      if (!celestial) break;
      switch (celestial.kind) {
        case 0: {
          //planet
          const planet = new Planet(scene, celestial.x.toNumber() * 100, celestial.y.toNumber() * 100, 'terrestrial');
          planet.setAngle(Math.random() * 360);
          scene.add.existing(planet);
          group.add(planet);
        }
      }
    } catch (e) {
      break;
    }
  }

}

export function renderPlanets1(scene: SpaceBaseScene): Phaser.GameObjects.Group {
  const planetGroup = scene.add.group();

  // adds random planets
  for (let i = 0; i < 73; i++) {
    const x = Phaser.Math.Between(0, scene.map?.widthInPixels ?? 0);
    const y = Phaser.Math.Between(0, scene.map?.heightInPixels ?? 0);
    const planet = new Planet(scene, x, y, 'terrestrial');
    planet.setAngle(Math.random() * 360);
    scene.add.existing(planet);
    planetGroup.add(planet);

    // adds moons in the viscinity of the planet
    addMoons(x, y, planetGroup, scene);
  }

  // adds random asteroids
  for (let i = 0; i < 17; i++) {
    const x = Phaser.Math.Between(0, scene.map?.widthInPixels ?? 0);
    const y = Phaser.Math.Between(0, scene.map?.heightInPixels ?? 0);
    const asteroid = new Planet(scene, x, y, 'asteroid-fire');
    asteroid.setAngle(Math.random() * 360);
    asteroid.setScale(0.5, 0.5);
    scene.add.existing(asteroid);
    planetGroup.add(asteroid);
  }

  // adds random factories
  for (let i = 0; i < 3; i++) {
    const x = Phaser.Math.Between(0, scene.map?.widthInPixels ?? 0);
    const y = Phaser.Math.Between(0, scene.map?.heightInPixels ?? 0);
    const factory = new Planet(scene, x, y, 'factory');
    factory.setAngle(Math.random() * 360);
    scene.add.existing(factory);
    planetGroup.add(factory);
  }

  return planetGroup;
}

// adds moons to a planet near (x, y)
function addMoons(x: number, y: number, group: Phaser.GameObjects.Group, scene: SpaceBaseScene): void {
  const maxMoonOffset = 150;
  const numMoons = Math.floor(Math.random() * 5);
  for (let i = 0; i < numMoons; i++) {
    const _x = Math.floor(x + (Math.random() * maxMoonOffset) - maxMoonOffset / 2);
    const _y = Math.floor(y + (Math.random() * maxMoonOffset) - maxMoonOffset / 2);
    const moon = new Planet(scene, _x, _y, 'moon');
    moon.setAngle(Math.random() * 360);
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
