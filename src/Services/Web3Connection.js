import React from "react";
import Web3 from "web3";
import { NFTAbi } from "../config/ABI/NFTAbi";
import { NFTContractAddress } from "../config/Constant/NFTContractAddress";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { store } from "../Redux/store";
import WalletConnectProvider from "@walletconnect/web3-provider";
import walletConnectModule from "@web3-onboard/walletconnect";
import { showCurrentNetwork } from "./Index";
export let web3 = new Web3(window.ethereum);
console.log(window.ethereum);
const injected = injectedModule();
const walletConnect = walletConnectModule({
  // bridge: "YOUR_CUSTOM_BRIDGE_SERVER",
  qrcodeModalOptions: {
    mobileLinks: ["metamask"],
  },
});
//  Create WalletConnect Provider
export const provider = new WalletConnectProvider({
  rpc: {
    1: "https://mainnet.infura.io/v3/9c48d1f781404552b1a017d597f6bee1/",
    // 1: "https://mainnet.mycustomnode.com",
  },
  qrcode: true,
  qrcodeModalOptions: {
    mobileLinks: ["metamask"],
  },
});

const MAINNET_RPC_URL =
  "https://mainnet.infura.io/v3/9c48d1f781404552b1a017d597f6bee1";

const onboard = Onboard({
  wallets: [walletConnect, injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
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
  console.log(wallets[0]);
  web3 = new Web3(wallets[0].provider);
  store.getState().ConnectivityReducer.Contract = new web3.eth.Contract(
    NFTAbi,
    NFTContractAddress
  );
  console.log(
    await new web3.eth.Contract(NFTAbi, NFTContractAddress).methods
      .balanceOf(wallets[0].accounts[0].address)
      .call()
  );
  return wallets;
};

export const Contract = new web3.eth.Contract(NFTAbi, NFTContractAddress);
