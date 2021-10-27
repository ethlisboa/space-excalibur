import { getWeb3Provider, getWeb3Signer } from '../../../actions/web3';
import { Input } from 'phaser';
import { SpaceBaseScene } from '../index';
import { PlanetMenu } from './menu';
import { Contract } from 'ethers';
import { Planet as PlanetContract } from 'spacexcalibur-contracts/typechain/Planet';

const { abi: PlanetABI, address: planetAddress } = require('spacexcalibur-contracts/deployments/optimistic/Planet.json');

export class Planet extends Phaser.GameObjects.Sprite {
    public id: string;
    public infoBox: PlanetMenu;

    constructor(scene: SpaceBaseScene, x: number, y: number, texture: string, id?: string) {
        super(
            scene,
            scene.game.canvas.width / 2,
            scene.game.canvas.height / 2,
            texture
        );
        scene.sys.displayList.add(this);
        scene.sys.updateList.add(this);

        this.setInteractive({ useHandCursor: true });
        this.setPosition(x, y);
        this.setTexture(texture);

        this.id = id ?? this.newId();
        this.infoBox = new PlanetMenu(scene, this.getBottomRight().x, this.getBottomRight().y, this);

        this.on(Input.Events.POINTER_DOWN, async () => {
            this.infoBox.setVisible(!this.infoBox.visible)
            try {
                const provider = getWeb3Provider();
                const contract = new Contract(planetAddress, PlanetABI, provider) as PlanetContract;
                const resourceAmount = await contract.accruedResources("0x36Ca879e11aA582AB92d43547da1EA5cFd57067b", this.id);
                this.infoBox.setResources(resourceAmount.toString());
            } catch (e) {
                console.log(e);
            }

            try {
                const signer = await getWeb3Signer();
                const contract = new Contract(planetAddress, PlanetABI, signer.getSigner()) as PlanetContract;
                await contract.collect("0x36Ca879e11aA582AB92d43547da1EA5cFd57067b", this.id);
            } catch (e) {
                window.alert((e as Error).message);
            }

        });
    }

    newId(): string {
        return (Math.random() * 1_000_000_000_000).toString(16).slice(0, 7);
    }
}
