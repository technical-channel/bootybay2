import React from "react";
import Web3 from "web3";
import { NFTAbi } from "../config/ABI/NFTAbi";
import { NFTContractAddress } from "../config/Constant/NFTContractAddress";

let web3 = new Web3(window.ethereum);

export const Contract = new web3.eth.Contract(NFTAbi, NFTContractAddress);
