import React from "react";
import ReactDOM from "react-dom";

import ScaleEffect from "./ImageScaleEffect";

ReactDOM.render(<ScaleEffect scaleWidthPercent={50} opacity={0.5}><img src={"https://www.w3schools.com/w3images/paris.jpg"}/></ScaleEffect>, document.getElementById("root"));
