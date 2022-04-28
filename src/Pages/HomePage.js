import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { BiPlus, BiMinus } from "react-icons/bi";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { getAllAccountDetails, connectToWallet } from "../Services/Index";
import { store } from "../Redux/store";
import { Contract } from "../Services/Web3Connection";
import ProgressBar from "../Components/ProgressBar";
import "./Slider.css";
import Slider from "../Components/Slider";
const web3_ = new Web3(window.ethereum);
const price = 0.009;
const maxNFT = 5;
function HomePage() {
  const [Counter, setCounter] = useState(1);
  const [Connect, setConnect] = useState(false);
  const [isTransaction, setisTransaction] = useState(false);
  const [supply, setSupply] = useState(0);
  useEffect(async () => {
    setSupply(await Contract.methods.supply().call());
  }, []);
  async function _HandleConnect() {
    await getAllAccountDetails()
      .then(async (res) => {
        if (res.result !== "") {
          setConnect(true);
          store.getState().ConnectivityReducer.metamaskConnect = true;
        }
      })
      .catch((err) => alert(err));
  }

  function handleIncrement() {
    if (Counter < 5) {
      setCounter(Counter + 1);
    }
  }
  function handleDecrement() {
    if (Counter === 1) {
      setCounter(1);
    } else setCounter(Counter - 1);
  }
  async function setMax() {
    setCounter(5);
  }
  async function Buy() {
    await Contract.methods
      .balanceOf(store.getState().ConnectivityReducer.metamaskAddress)
      .call()
      .then(async (res) => {
        setisTransaction(true);
        if (res >= 5) {
          alert(
            `You Don't mint NFT more than 5 on Same Address,You Only  Can Mint ${
              res - 5
            } NFT`
          );
          setisTransaction(false);
        } else {
          await Contract.methods
            .mintBuy(parseInt(Counter))
            .send({
              from: store.getState().ConnectivityReducer.metamaskAddress,
              value: web3_.utils.toWei(`${Counter * price}`, "ether"),
              gas: 150000,
              gasPrice: "30000000000",
            })
            .on("transactionHash", function (hash) {})
            .on("confirmation", function (confirmationNumber, receipt) {})
            .then(function (data) {
              console.log(data);
              setisTransaction(false);
              setConnect(false);
              setCounter(1);
            })
            .catch((err) => {
              setisTransaction(false);
              setConnect(false);
              setCounter(1);
              alert("User Rejected Transaction");
            });
        }
      });
  }
  return (
    <>
      {isTransaction ? (
        <div className="h-screen flex flex-col justify-center">
          <h1 className="text-white text-3xl font-bold ">
            Transaction is Progress....
          </h1>
        </div>
      ) : (
        <>
          <div className="relative">
            {/* <img
              src={"https://www.aku.world/images/1.jpeg"}
              alt=""
              className="absolute h-full w-full"
            ></img> */}

            <div className="h-full max-w-[1080px] relative mx-auto relative flex flex-col-reverse md:flex-row md:h-screen">
              <div className="overflow-hidden flex-1 relative h-full  ">
                <Slider />
              </div>
              <div className=" relative rounded flex flex-col justify-center md:flex-1 w-full md:max-w-4xl mx-auto ">
                <div className="mb-[32px] text-white text-xl text-center font-semibold ">
                  <div>Special Price for Discord Members</div>
                  <div>APRIL 28-2AM EST</div>
                </div>
                <div className="px-2 mb-[32px] text-white text-xl text-center flex justify-between font-semibold">
                  <div>
                    <div>Supply</div>
                    <div>{supply}</div>
                  </div>
                  <div>
                    <div>Price</div>
                    <div>{price}&nbsp;ETH</div>
                  </div>
                  <div>
                    <div>MAX</div>
                    <div>{maxNFT} PER WALLET</div>
                  </div>
                </div>
                <div className=" opacity-100 ">
                  <div className=" rounded-[15px] overflow-y-auto h-full opacity-100 mx-auto">
                    <div className=" rounded-md max-w-[400px] mx-auto w-full h-full bg-[#0b0b08cc] p-[32px]">
                      <div className=" w-full">
                        {" "}
                        <div className="text-white font-bold text-[40px] py-4">
                          BONUS SALE
                        </div>
                        {/* NFT Block */}
                        <div className="mb-[32px] items-center p-[12px] border-2 border-white text-white rounded-md flex justify-between p-[12px]">
                          <div>
                            <img
                              width="82px"
                              className="rounded-md"
                              src="https://aku.mintyournfts.live/static/media/gifius.gif"
                            ></img>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">Price per NFT</div>
                            <div className="text-white text-2xl">
                              {price} ETH Each
                            </div>
                          </div>
                        </div>
                        {/* Counter */}
                        <div>
                          {" "}
                          <div className="mb-[32px] border-2 border-white rounded-md flex justify-between p-[12px] bg-[#7b7b7b69]">
                            <div className="flex items-center text-white justify-center ">
                              <span
                                className="text-xl mx-2 text-white cursor-pointer"
                                onClick={handleDecrement}
                              >
                                <BiMinus />
                              </span>
                              <span className="" max={5}>
                                {Counter}
                              </span>
                              <span
                                className="text-xl mx-2 text-white cursor-pointer"
                                onClick={handleIncrement}
                              >
                                <BiPlus />
                              </span>
                            </div>
                            {/* Set MAximaum Limit */}
                            <div
                              className="bg-white text-sm py-[5px] px-[15px] shadow-white shadow-lg "
                              onClick={setMax}
                              style={{ boxShadow: "0 0 10px 2px #fff" }}
                            >
                              SET MAX
                            </div>
                          </div>
                          <hr className=""></hr>
                          <div className="h-[65px] items-center flex justify-between font-bold text-xl xl:text-base  text-white">
                            <span>Total</span>
                            <span>
                              {" "}
                              {parseFloat(Counter * 0.33).toFixed(2)}
                              &nbsp; ETH
                            </span>
                          </div>
                          <hr className="mb-[32px]"></hr>
                          <div className="">
                            {Connect ? (
                              <button
                                className="xl:text-sm py-[5px] px-[15px]  w-auto text-sm bg-white text-black "
                                style={{ boxShadow: "0 0 10px 2px #fff" }}
                                onClick={Buy}
                              >
                                MINT
                              </button>
                            ) : (
                              <button
                                className=" xl:text-base  py-[5px] px-[15px]  w-full text-sm bg-white text-black "
                                onClick={_HandleConnect}
                                style={{ boxShadow: "0 0 10px 2px #fff" }}
                              >
                                CONNECT WALLET
                              </button>
                            )}
                            <div>
                              <ProgressBar />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
