import React from "react";
import ReactDOM from "react-dom";

import ScaleEffect from "./ImageScaleEffect";

ReactDOM.render(
  <ScaleEffect width={'150px'} heightj={"300px"} changeChild={true} anymationDelay={0.5} anymationDurationPosition={5} anymationDurationSize={0.5} scaleWidthPercent={30} opacity={0.5}>
    <img src={"https://www.w3schools.com/w3images/paris.jpg"}/>
  </ScaleEffect>, document.getElementById("root"));
