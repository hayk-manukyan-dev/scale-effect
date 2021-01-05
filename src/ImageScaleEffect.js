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
    imageBounding = element.getBoundingClientRect()

    const scaleWidthPercent = props.scaleWidthPercent ? props.scaleWidthPercent : 80
    const imageScalePercent = (window.innerWidth * scaleWidthPercent / 100) * (100 / imageBounding.width) / 100




          // height: 300px;
          // width: 30%;

          //           top: ${imageBounding.y}px;
          // left: ${imageBounding.x}px;



    const closeStyle = `
    .ContainerScaleEffectClose {
      -webkit-animation-duration:2s,2s;
      animation-duration:2s,2s;
      -webkit-animation-fill-mode:forwards;
      animation-fill-mode:forwards;
      -webkit-animation-name:ContainerScaleEffectCloseKeyframe;
      animation-name:ContainerScaleEffectCloseKeyframe;

            animation: ContainerScaleEffectCloseKeyframe 10s infinite;

      }`
    injectStyle(closeStyle)

    setTimeout(scaleRef.current.classList.add("ContainerScaleEffectClose"), 1000)
    
    // document.getElementById("ScaleEffect").outerHTML = "";
    element.style.opacity = 1 //to do
  }

  const handleImageScale = (target) => {
    element = target
    imageBounding = target.getBoundingClientRect()

    const scaleWidthPercent = props.scaleWidthPercent ? props.scaleWidthPercent : 80
    const imageScalePercent = (window.innerWidth * scaleWidthPercent / 100) * (100 / imageBounding.width) / 100


    target.style.opacity = props.opacity ? props.opacity : 0    

    //style

    const keyframesStyle = `
      @-webkit-keyframes ContainerScaleEffectCloseKeyframe {
        10% {
          
        height: ${imageBounding.height * imageScalePercent}px !important;
        width: ${scaleWidthPercent}% !important;


        }
        90% {
                  top: ${imageBounding.y}px !important;
        left: ${imageBounding.x}px !important;
        }
      }
    `;
    injectStyle(keyframesStyle);



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

      console.log(AnymatedContainer)

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
