import React, { useEffect } from "react";
import $ from "jquery";
function Slider() {
  return (
    <>
      <div className="items">
        <div class="item max-w-[400px]">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "boot-bay-assets/slide1.gif"}
            width="400px"
          />
        </div>
        <div class="item max-w-[400px]">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "boot-bay-assets/slide1.gif"}
            width="400px"
          />
        </div>
        <div class="item max-w-[400px]">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "boot-bay-assets/slide1.gif"}
            width="400px"
          />
        </div>
        <div class="item max-w-[400px]">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "boot-bay-assets/slide1.gif"}
            width="400px"
          />
        </div>
        <div class="item max-w-[400px]">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "boot-bay-assets/slide1.gif"}
            width="400px"
          />
        </div>
        <div class="item max-w-[400px]">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "boot-bay-assets/slide1.gif"}
            width="400px"
          />
        </div>
      </div>
    </>
  );
}

export default Slider;
