import React, {useState} from "react"
import ReactDOM from 'react-dom'
import styled, { keyframes } from "styled-components"

/* props
    position = fixed
    opacity = 0
    scaleWidthPercent = 80
    anymationDelay = 0
    anymationDurationSize = 2
    anymationDurationPosition = 2

    width = fit-content
    height = fit-content

    after = show same content

 */


export default function ContainerScaleEffect(props) {
  let chieldElement = React.cloneElement(props.children, { width: "100%", height: '100%' })

  let element = null
  let elementDef = {style: {}}

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
      animation-duration: ${anymationDurationPosition}s, ${anymationDurationSize }s;
      animation-fill-mode: forwards;
      animation-name: ${ScaleEffectCloseSize}, ${ScaleEffectDefPosition}`

    const scale = <div style={{position: "absolute", width: "100%", height: "100%"}}>
      <AnymatedContainer
        style={{"backgroundColor": "black", "position": props.position ? props.position : "fixed", "left": "50%", "top": "50%", "transform": "translate(-50%, -50%)", "width": `${scaleWidthPercent}%`, "height": `${bounding.height * imageScalePercent}px`}}
      >
        { chieldElement }
      </AnymatedContainer>
    </div>

    ReactDOM.render(scale, document.getElementById('ScaleEffect'));
 
    setTimeout(() => {
      document.getElementById("ScaleEffect").outerHTML = "";
      element.style.opacity = elementDef.style.opacity
    }, anymationDelay + anymationDurationSize + anymationDurationPosition * 1000)
  }

  const handleScale = (target) => {
    element = target
    const bounding = element.getBoundingClientRect()

    const scaleWidthPercent = props.scaleWidthPercent ? props.scaleWidthPercent : 80
    const imageScalePercent = (window.innerWidth * scaleWidthPercent / 100) * (100 / bounding.width) / 100


    if(props.opacity) {
      elementDef.style.opacity = element.style.opacity
      element.style.opacity = props.opacity
    }

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
      animation-duration: ${anymationDurationPosition}s, ${anymationDurationSize}s;
      animation-fill-mode: forwards;
      animation-name: ${ScaleEffectCenter}, ${ScaleEffectSize}`


    const scale = <div onClick={() => closeEvent()} style={{position: "absolute", width: "100%", height: "100%"}}>
      <AnymatedContainer style={{"backgroundColor": "black", "position": props.position ? props.position : "fixed", "left": bounding.x, "top": bounding.y, "width": bounding.width, "height": bounding.height}}>
        {chieldElement}
      </AnymatedContainer>
    </div>
    
    let div = document.createElement('div');
    div.setAttribute("id", "ScaleEffect")
    document.getElementById('root').appendChild(div)
    ReactDOM.render(scale, document.getElementById('ScaleEffect'), () => {
      //to do after anymation can change content
    })
  }

  return (
    <div style={{width: props.width ? props.width : 'fit-content', height: props.height ? props.height : 'fit-content'}} onClick={(e) => handleScale(e.target)}>
      { chieldElement }
    </div>
  );
}