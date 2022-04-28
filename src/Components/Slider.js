import React, { useEffect } from "react";
import $ from "jquery";
function Slider() {
  return (
    <>
      <div class="items">
        <div class="item">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "boot-bay-assets/slide1.gif"}
            width="400px"
          />
        </div>
        <div class="item">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "boot-bay-assets/slide1.gif"}
            width="400px"
          />
        </div>
        <div class="item">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "boot-bay-assets/slide1.gif"}
            width="400px"
          />
        </div>
        <div class="item">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "boot-bay-assets/slide1.gif"}
            width="400px"
          />
        </div>
        <div class="item">
          <img
            alt=""
            src={process.env.PUBLIC_URL + "boot-bay-assets/slide1.gif"}
            width="400px"
          />
        </div>
        <div class="item">
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
