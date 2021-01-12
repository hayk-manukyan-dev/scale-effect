import React, {useRef, useState} from "react"
import ReactDOM from 'react-dom'
import styled, { keyframes } from "styled-components"

/* props
    position = fixed
    opacity = 0
    scaleWidthPercent = 80
    height = auto adapting / with type of size
    anymationDelay = 0
    anymationDurationSize = 2
    anymationDurationPosition = 2
    changeChild = true

    if want not change child content size set changeChild = false required to use your custom media width/height   
 */


export default function ContainerScaleEffect(props) {
  let chieldElement = props.changeChild === undefined || props.changeChild ? React.cloneElement(props.children, { width: "100%", height: 'auto' }) : React.cloneElement(props.children);

  let element = null

  const anymationDelay = props.anymationDelay ? props.anymationDelay : 0
  const anymationDurationSize = props.anymationDurationSize ? props.anymationDurationSize : 2
  const anymationDurationPosition = props.anymationDurationPosition ? props.anymationDurationPosition : 2

  const closeEvent = () => {
    const bounding = element.getBoundingClientRect()

    const scaleWidthPercent = props.scaleWidthPercent ? props.scaleWidthPercent : 80
    const imageScalePercent = (window.innerWidth * scaleWidthPercent / 100) * (100 / bounding.width) / 100

    const ScaleEffectCloseSize = keyframes`
      to {
        height: ${bounding.height}px;
        width: ${bounding.width}px;
      }`

    const ScaleEffectDefPosition = keyframes`
      to {
        transform: initial;
        top: ${bounding.y}px;
        left: ${bounding.x}px;
      }`

    const AnymatedContainer = styled.div`
      animation-delay: ${anymationDelay}s;
      animation-duration: ${anymationDurationSize}s, ${anymationDurationPosition}s;
      animation-fill-mode: forwards;
      animation-name: ${ScaleEffectCloseSize}, ${ScaleEffectDefPosition}`

    const scale = <div style={{position: "absolute", width: "100%", height: "100%"}}>
      <AnymatedContainer
        style={{"backgroundColor": "black", "position": props.position ? props.position : "fixed", "left": "50%", "top": "50%", "transform": "translate(-50%, -50%)", "width": `${scaleWidthPercent}%`, "height": `${bounding.height * imageScalePercent}px`}}
      >{ chieldElement }</AnymatedContainer>
    </div>

    ReactDOM.render(scale, document.getElementById('ScaleEffect'));
 
    setTimeout(() => {
      document.getElementById("ScaleEffect").outerHTML = "";
      element.style.opacity = props.opacity ? props.opacity : 1
    }, anymationDelay + anymationDurationSize + anymationDurationPosition * 1000)
  }

  const handleScale = (target) => {
    element = target
    const bounding = element.getBoundingClientRect()

    const scaleWidthPercent = props.scaleWidthPercent ? props.scaleWidthPercent : 80
    const imageScalePercent = (window.innerWidth * scaleWidthPercent / 100) * (100 / bounding.width) / 100


    element.style.opacity = props.opacity ? props.opacity : 0

    //style
    const ScaleEffectCenter = keyframes`
      to {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }`

    const ScaleEffectSize = keyframes`
      to {
        height: ${props.height ? props.height : bounding.height * imageScalePercent + 'px'};
        width: ${scaleWidthPercent}%;
      }`


    const AnymatedContainer = styled.div`
      animation-delay: ${anymationDelay}s;
      animation-duration: ${anymationDurationSize}s, ${anymationDurationPosition}s;
      animation-fill-mode: forwards;
      animation-name: ${ScaleEffectCenter}, ${ScaleEffectSize}`

    const scale = <div onClick={() => closeEvent()} style={{position: "absolute", width: "100%", height: "100%"}}>
      <AnymatedContainer
        style={{"backgroundColor": "black", "position": props.position ? props.position : "fixed", "left": bounding.x, "top": bounding.y, "width": bounding.width, "height": bounding.height}}
      >{chieldElement}</AnymatedContainer>
    </div>
    
    let div = document.createElement('div');
    div.setAttribute("id", "ScaleEffect")
    document.getElementById('root').appendChild(div)
    ReactDOM.render(scale, document.getElementById('ScaleEffect'));
  }
  return (
    <div onClick={(e) => handleScale(e.target)}>
      {chieldElement}
    </div>
  );
}     
