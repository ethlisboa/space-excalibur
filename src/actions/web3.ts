import Web3Modal, { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

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