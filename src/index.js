import React from "react";
import ReactDOM from "react-dom";

import ScaleEffect from "./ImageScaleEffect";

ReactDOM.render(<ScaleEffect anymationDelay={0.5} anymationDurationPosition={5} anymationDurationSize={5} scaleWidthPercent={50}><img src={"https://www.w3schools.com/w3images/paris.jpg"}/></ScaleEffect>, document.getElementById("root"));
