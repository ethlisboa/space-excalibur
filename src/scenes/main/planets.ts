import { Input } from "phaser";
import { getWeb3Provider } from "../../actions/web3";
import { BaseMapScene } from ".";

export function renderPlanets(scene: BaseMapScene) {
    const planetGroup = scene.add.group();
    for (let i = 0; i < 100; i++) {
        const planetSprite = scene.make.sprite({
            key: 'planet-green',
            x: Phaser.Math.Between(0, scene.map?.widthInPixels ?? 0),
            y: Phaser.Math.Between(0, scene.map?.heightInPixels ?? 0)
        }, true).setInteractive({
            useHandCursor: true
        });
        planetSprite.on(Input.Events.POINTER_DOWN, async () => {
            console.log("planet clicked")
            const provider = await getWeb3Provider();
            console.log("blockNumber", await provider.getBlockNumber())
        })
        planetGroup.add(planetSprite);
    }
}