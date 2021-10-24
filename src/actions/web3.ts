import Web3Modal, { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
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


export function getWeb3Provider(): JsonRpcProvider {
    return new providers.JsonRpcProvider("https://optimism-kovan.infura.io/v3/31bd29e4b354453e8a56f1153804c30c")
}


export async function getWeb3Signer(): Promise<Web3Provider> {
    return new providers.Web3Provider(await web3Modal.connect())
}
