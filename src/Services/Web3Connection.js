import React from "react";
import Web3 from "web3";
import { NFTAbi } from "../config/ABI/NFTAbi";
import { NFTContractAddress } from "../config/Constant/NFTContractAddress";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import { store } from "../Redux/store";
export let web3 = new Web3(window.ethereum);
console.log(window.ethereum);
const injected = injectedModule();
const MAINNET_RPC_URL =
  "https://mainnet.infura.io/v3/9c48d1f781404552b1a017d597f6bee1";

const onboard = Onboard({
  wallets: [injected],
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
  return wallets;
};
export const Contract = new web3.eth.Contract(NFTAbi, NFTContractAddress);
