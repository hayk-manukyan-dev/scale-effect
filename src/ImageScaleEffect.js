import React, {useRef} from "react"
import ReactDOM from 'react-dom'
import styled, { keyframes } from "styled-components"
import injectStyle from './injectStyle'

/* props
    position = fixed
    opacity = 0
    scaleWidthPercent = 80
 */


export default function ContainerScaleEffect(props) {
  let scaleRef = useRef(null);


  let element = null
  let scaleContainer = null
  let imageBounding = null

  const closeEvent = () => {
    const keyframesStyle = `
      @keyframes ContainerScaleEffectClose {
        to {
          top: ${imageBounding.y}px;
          left: ${imageBounding.x}px;
          transform: translate(-50%, -50%);

          height: 300px;
          width: 30%;
        }
      }
    `;
    const closeStyle = `
    .ContainerScaleEffectClose {
        animation-duration: 2s;
        animation-fill-mode: forwards;
        animation-name: ContainerScaleEffectClose;
      }`
    injectStyle(keyframesStyle);
    injectStyle(closeStyle)


    scaleRef.current.classList.add("ContainerScaleEffectClose")
    // document.getElementById("ScaleEffect").outerHTML = "";
    element.style.opacity = 1 //to do
  }

  const handleImageScale = (target) => {
    const scaleWidthPercent = props.scaleWidthPercent ? props.scaleWidthPercent : 80
    imageBounding = target.getBoundingClientRect()
    const imageScalePercent = (window.innerWidth * scaleWidthPercent / 100) * (100 / imageBounding.width) / 100

    element = target
    target.style.opacity = props.opacity ? props.opacity : 0    

    //style
    const ScaleEffectCenter = keyframes`
      to {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }`

    const ScaleEffectSize = keyframes`
      to {
        height: ${imageBounding.height * imageScalePercent}px;
        width: ${scaleWidthPercent}%;
      }`

    const AnymatedContainer = styled.div`
      animation-delay: 0s;
      animation-duration: 2s, 2s;
      animation-fill-mode: forwards;
      animation-name: ${ScaleEffectCenter}, ${ScaleEffectSize}`

    scaleContainer = <AnymatedContainer 
        ref={scaleRef}
        style={{"backgroundColor": "black", "position": props.position ? props.position : "fixed", "left": imageBounding.x, "top": imageBounding.y, "width": imageBounding.width, "height": imageBounding.height}}
      />

    const scale = <div onClick={() => closeEvent()} style={{position: "absolute", width: "100%", height: "100%"}}>
      { scaleContainer }
    </div>
    
    let div = document.createElement('div');
    div.setAttribute("id", "ScaleEffect")
    document.getElementById('root').appendChild(div)
    ReactDOM.render(scale, document.getElementById('ScaleEffect'));
  }
  return (
    <div>
      <img width="145px" onClick={(e) => handleImageScale(e.target)} src={props.src} />
    </div>
  );
}     
