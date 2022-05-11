import React from "react";
import Web3 from "web3";
import { NFTAbi } from "../config/ABI/NFTAbi";
import { NFTContractAddress } from "../config/Constant/NFTContractAddress";
import Onboard from "@web3-onboard/core";
import injectedModule, { ProviderLabel } from "@web3-onboard/injected-wallets";
import { store } from "../Redux/store";
import WalletConnectProvider from "@walletconnect/web3-provider";
import walletConnectModule from "@web3-onboard/walletconnect";
import { showCurrentNetwork } from "./Index";
import { ethers } from "ethers";
export let web3 = new Web3(window.ethereum);
console.log(window.ethereum);
const injected = injectedModule();
const walletConnect = walletConnectModule({
  // bridge: "https://bridge.walletconnect.org",
});
//  Create WalletConnect Provider
// export const provider = new WalletConnectProvider({
//   rpc: {
//     1: "https://mainnet.infura.io/v3/9c48d1f781404552b1a017d597f6bee1/",
//     // 1: "https://mainnet.mycustomnode.com",
//   },
//   qrcode: true,
//   qrcodeModalOptions: {
//     mobileLinks: ["metamask", "trust"],
//   },
// });

const MAINNET_RPC_URL =
  "https://mainnet.infura.io/v3/9c48d1f781404552b1a017d597f6bee1";

const onboard = Onboard({
  wallets: [walletConnect, injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      namespace: "evm",
      label: "Ethereum Mainnet",
      rpcUrl: MAINNET_RPC_URL,
    },
  ],
  appMetadata: {
    name: "My App",
    icon: `${process.env.PUBLIC_URL}/boot-bay-assets/NFT_82x82.png`,
    description: "My app using Onboard",
  },
});

export const ConnectWallet = async () => {
  const wallets = await onboard.connectWallet();
  const { accounts, chains, provider } = wallets[0];
  let data = new ethers.providers.Web3Provider(provider, "any");
  console.log(data);
  web3 = new Web3(data);
  console.log(web3);
  store.getState().ConnectivityReducer.Contract = new web3.eth.Contract(
    NFTAbi,
    NFTContractAddress
  );
  if (wallets[0].chains[0].id !== "0x1") {
    window.ethereum.on("chainChanged", (chain) => {
      console.log(chain);
      if ("0x1" !== chain) {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }],
        });
      }
    });
    window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }],
    });
  }
  return wallets;
};

export const Contract = new web3.eth.Contract(NFTAbi, NFTContractAddress);
