import Web3Modal, { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Web3Provider } from "@ethersproject/providers";
import { providers } from "ethers";

const opts: IProviderOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: "fd1f29ab70844ef48e644489a411d4b3" // required
        }
    }
}

export const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions: opts // required
});


export async function getWeb3Provider(): Promise<Web3Provider> {
    return new providers.Web3Provider(await web3Modal.connect())
}