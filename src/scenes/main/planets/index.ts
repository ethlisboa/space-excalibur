import { SpaceBaseScene } from "../index";
import { Planet } from './planet';

export function renderPlanets(scene: SpaceBaseScene): Phaser.GameObjects.Group {
  const planetGroup = scene.add.group();

  // adds random planets
  for (let i = 0; i < 50; i++) {
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
  for (let i = 0; i < 15; i++) {
    const x = Phaser.Math.Between(0, scene.map?.widthInPixels ?? 0);
    const y = Phaser.Math.Between(0, scene.map?.heightInPixels ?? 0);
    const asteroid = new Planet(scene, x, y, 'asteroid-fire');
    asteroid.setAngle(Math.random() * 360);
    asteroid.setScale(0.5, 0.5);
    scene.add.existing(asteroid);
    planetGroup.add(asteroid);
  }

  return planetGroup;
}

// adds moons to a planet near (x, y)
function addMoons(x: number, y: number, group: Phaser.GameObjects.Group, scene: SpaceBaseScene): void {
  const maxMoonOffset = 150;
  const numMoons = Math.floor(Math.random() * 4);
  for (let i = 0; i < numMoons; i++) {
    const _x = Math.floor(x + (Math.random() * maxMoonOffset) - maxMoonOffset / 2);
    const _y = Math.floor(y + (Math.random() * maxMoonOffset) - maxMoonOffset / 2);
    const moon = new Planet(scene, _x, _y, 'moon');
    moon.setAngle(Math.random() * 360);
    scene.add.existing(moon);
    group.add(moon);
  }
}
