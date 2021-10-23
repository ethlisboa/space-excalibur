import { Scene } from "phaser";
import { providers } from "ethers";
import { web3Modal } from "../../actions/web3";
import { Button } from "./buttons";

export class MenuScene extends Scene {
    constructor() {
        super('menu-scene');
    }

    preload() {
        this.load.image('btn', 'assets/sprites/buttons/blank-btn.png')
    }

    create(): void {
        const connectButton = new Button(this, this.sys.game.canvas.width - 200, 50, "Connect");
        connectButton.onClick(async () => {
            await web3Modal.clearCachedProvider();
            const web3Provider = await web3Modal.connect();
            const provider = new providers.Web3Provider(web3Provider);
            if (await (await provider.getNetwork()).chainId !== 69) {
                window.alert("Unsupported network. Only Optimistic Kovan is supported");
                return;
            }
            const acc = await (await provider.getSigner()).getAddress();
            connectButton.setText(acc);
            connectButton.disable();
            web3Provider.on("disconnect", () => {
                connectButton.setText("Connect")
                connectButton.enable();
            })
            web3Provider.on("accountsChanged", (accounts: any) => {
                if (accounts.length === 0) {
                    connectButton.setText("Connect")
                    connectButton.enable();
                }
                connectButton.setText(accounts[0]);
            });
        })
        this.add.existing(connectButton);
    }

}
