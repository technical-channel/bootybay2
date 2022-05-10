import "./App.css";
import React from "react";
import HomePage from "./Pages/HomePage";
import Web3 from "web3";
import { ConnectWallet, Contract } from "./Services/Web3Connection";
import { store } from "./Redux/store";
const web3_ = new Web3(window.ethereum);
function App() {
  return (
    <div className="App">
      <main className="h-screen overflow-hidden">
        <HomePage />
      </main>
    </div>
  );
}

export default App;
