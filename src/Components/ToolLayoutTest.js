
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const alphabet =
  "a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z ";
const Container = styled.div`
  display: flex;
  height: 100vh;
`;


function LeftResizerCircleLeftButton(props) {
  const ContainerSVG = styled.svg`
    position: absolute;
    height: 50px;
    width: 50px;
    cursor: w-resize;
    transform: translate(6px, 45vh);
    -webkit-transform: translate(6px,45vh);
    -ms-transform: translate(6px,45vh);
  `;
  return (
    <ContainerSVG onClick={() => props.clickHandler()}>
        <circle
          cx="0"
          cy="25"
          r="20"
          stroke="black"
          strokeWidth="1"
          fill="black"
        />
        <polygon
          stroke="white"
          fill="white"
          strokeWidth="1"
          points="
                3,25 
                12,20
                12,30
             "
        />
    </ContainerSVG>
  );
}

function LeftResizerCircleRightButton(props) {
  const ContainerSVG = styled.svg`
    position: absolute;
    height: 50px;
    width: 50px;
    cursor: e-resize;
    transform: translate(6px, 45vh);
  `;
  return (
   
    <ContainerSVG onClick={() => props.clickCloseHandler()}>
        <circle
          cx="0"
          cy="25"
          r="20"
          stroke="black"
          strokeWidth="1"
          fill="black"
        />
        <polygon
          stroke="white"
          fill="white"
          strokeWidth="1"
          points="
                   13,25 
                   4,20
                   4,30
                       "
        />
    </ContainerSVG>
  );
}

function RightResizerCircleRightButton(props) {
  const ContainerSVG = styled.svg`
    position: absolute;
    height: 50px;
    width: 50px;
    cursor: e-resize;
    transform: translate(-51px, 45vh);
  `;
  return (
    <ContainerSVG  onClick={() => props.clickCloseHandlerRight()}>
     
        <circle
          cx="50"
          cy="25"
          r="20"
          stroke="black"
          strokeWidth="1"
          fill="black"
        />

        <polygon
          stroke="white"
          fill="white"
          strokeWidth="1"
          points="
                     47,25 
                     38,20
                     38,30
                         "
        />
    </ContainerSVG>
  );
}

function RightResizerCircleLeftButton(props) {
  const ContainerSVG = styled.svg`
    position: absolute;
    height: 50px;
    width: 50px;
    cursor: w-resize;
    transform: translate(-51px, 45vh);
  `;
  return (
    <ContainerSVG onClick={() => props.clickOpenHandlerRight()}>
        <circle
          cx="50"
          cy="25"
          r="20"
          stroke="black"
          strokeWidth="1"
          fill="black"
        />

        <polygon
          stroke="white"
          fill="white"
          strokeWidth="1"
          points="
               35,25 
               44,31
               44,20
                    "
        />
    </ContainerSVG>
  );
}


function ToolLayoutExample(props) {
  var w = window.innerWidth;
  const leftW = 200;
  const rightW = 300;
  const resizerW = 6;
  let buttonsState;
  if(props.deviceType === "computer"){
    buttonsState = false
  } else {

    buttonsState = true
  }
  const middleW = w - leftW - rightW - resizerW - resizerW;
  const [leftWidth, setLeftWidth] = useState(leftW);
  const [rightWidth, setRightWidth] = useState(rightW);
  const [isResizing, setIsResizing] = useState(false);
  const [currentResizer, setCurrentResizer] = useState("");
  const [firstPanelHidden, setFirstPanelHidden] = useState(false);
  const [leftButtonOpenVisible, setLeftButtonOpenVisible] = useState(buttonsState);
  const [leftButtonCloseVisible, setLeftButtonCloseVisible] = useState(false);
  const [rightButtonOpenVisible, setRightButtonOpenVisible] = useState(buttonsState);
  const [rightButtonCloseVisible, setRightButtonCloseVisible] = useState(false);

  const [middleWidth, setMiddleWidth] = useState(middleW);
  const containerRef = useRef();

  useEffect(() => {
    if(props.deviceType === "computer"){
      window.addEventListener("resize", handleWindowResize);
      window.addEventListener("mouseup", stopResize);
      containerRef.current.addEventListener("mousedown", startResize);
      containerRef.current.addEventListener("mousemove", resizeFirst);
      containerRef.current.addEventListener("mouseover", mouseOverHandler);
      containerRef.current.addEventListener("mouseout", mouseOutHandler);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
        window.removeEventListener("mouseup", stopResize);
        containerRef.current.removeEventListener("mousedown", startResize);
        containerRef.current.removeEventListener("mousemove", resizeFirst);
        containerRef.current.removeEventListener("mouseover", mouseOverHandler);
        containerRef.current.removeEventListener("mouseout", mouseOutHandler);
      };
    }else {
      window.addEventListener("touchend", stopResize)
      containerRef.current.addEventListener("touchstart", startResize);
      containerRef.current.addEventListener("touchmove", resizeFirst);
      return () =>{
        window.removeEventListener("touchend", stopResize);
        containerRef.current.removeEventListener("touchstart", startResize);
        containerRef.current.removeEventListener("touchmove", resizeFirst);
      }
    }
 
  });


  const handleWindowResize = () => {
    let middleW = window.innerWidth - leftWidth - rightWidth - 6 - 6;
    console.log("middlewidth", middleW);
    setMiddleWidth(middleW);
  };

   const mouseOverHandler = (e) => {
        // console.log(e.target.id)
        if (e.target.id === "leftpanel") {
            setLeftButtonOpenVisible(true);
        }
        if (e.target.id === "rightpanel") {
            setRightButtonOpenVisible(true);
        }

    }
    const mouseOutHandler = (e) => {
        // console.log(e.target.id)
        if (e.target.id === "leftpanel") {
          setLeftButtonOpenVisible(false);
        }
        if (e.target.id === "rightpanel") {
          setRightButtonOpenVisible(false);
        }
    }



  const startResize = (event) => {
    if (event.target.id === "first" || event.target.id === "second") {
      console.log("mouseDown called", event.target.id);
      setCurrentResizer(event.target.id);
      setIsResizing(true);
    }
  };

  const stopResize = () => {
    console.log("mouseUp called");
    setIsResizing(false);
    setCurrentResizer("");
  };


  const resizeFirst = (e) => {
    if (isResizing) {
      console.log(`e.clientX ${e.clientX}`);
      const w = window.innerWidth;
      let event = {}
      if(e && e.changedTouches && e.changedTouches.length >= 0){
        event = e.changedTouches[0];
      }else{
        event = e;
      }

      if (currentResizer === "first") {
        // console.log('FIRST RESIZER');
        let leftW = event.clientX - resizerW / 2;
        let rightW = rightWidth;
        if (leftW < 40) {
          leftW = 0;
          event.target.style.cursor = "e-resize";
          // setFirstPanelHidden(true);
        } else if (leftW < 100) {
          // console.log('between 50 and 100');
          leftW = 100;
          e.target.style.cursor = "col-resize";
          // setFirstPanelHidden(false);
        } else if (leftW >= 300) {
          leftW = 300;
          e.target.style.cursor = "w-resize";
          // setFirstPanelHidden(false);
        } else if (firstPanelHidden) {
          setFirstPanelHidden(false);
        }

        let middleW = w - leftW - rightWidth - resizerW - resizerW;
        if (middleW < 100) {
          middleW = 100;
          leftW = w - rightWidth - resizerW - resizerW - middleW;
        }
        setLeftWidth(leftW);
        setMiddleWidth(middleW);
        setRightWidth(rightW);
      } else if (currentResizer === "second") {
        console.log('SECOND RESIZER');
        console.log(`e.clientX ${e.clientX}`);
        let middleW = event.clientX - leftWidth - resizerW;
        let rightW = w - leftWidth - resizerW - middleW - resizerW;
        if (rightW < 40) {
          rightW = 0;
          middleW = w - leftWidth - resizerW - resizerW - rightW;
          e.target.style.cursor = "w-resize";
        } else if (rightW < 100) {
          rightW = 0;
          middleW = w - leftWidth - resizerW - resizerW - rightW;
          e.target.style.cursor = "col-resize";
        } else if (middleW < 100) {
          middleW = 100;
          rightW = w - leftWidth - resizerW - resizerW - middleW;
        } else {
          e.target.style.cursor = "col-resize";
        }
        setRightWidth(rightW);
        setMiddleWidth(middleW);
      }
    }
  };

  const allParts = [];
  let Left = styled.div`
    width: ${leftWidth}px;
    display: ${leftWidth === 0 ? "none" : ""};
    min-height: 1vh;
    overflow-y: auto;
    background-color: aliceblue;

  `;

  const leftSection = (
    <Left key="left" id="leftpanel">
      {alphabet}
    </Left>
  );
  allParts.push(leftSection);

  let ResizerFirst = styled.div`
    width: 5px;
    border-right: 1px solid black;
    position: relative;
    cursor: col-resize;
    flex-shrink: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `;

  const leftResizerMouseOverHandler = () => {
    if (leftWidth === 0) {
      setLeftButtonCloseVisible(true);
    } else {
      setLeftButtonOpenVisible(true);
      
    }
    if(rightButtonCloseVisible || rightButtonOpenVisible){
      setRightButtonCloseVisible(false);
      setRightButtonOpenVisible(false);
    }
  };

  const firstPanelHideable = () => {
    setLeftButtonOpenVisible(false);
    let leftW = leftWidth;
    if (leftW > 0) {
      leftW = 0;
    }
    let rightW = rightWidth;
    let middleW = w - resizerW - resizerW - leftW - rightWidth;
    setLeftWidth(leftW);
    setMiddleWidth(middleW);
    setRightWidth(rightW);
  };

  const firstPanelVisible = (e) => {
    setLeftButtonCloseVisible(false);
    let leftW = leftWidth;
    if (leftW === 0) {
      leftW = 100;
    }
 
    let rightW = rightWidth;
    let middleW = w - resizerW - resizerW - leftW - rightWidth;
    setLeftWidth(leftW);
    setMiddleWidth(middleW);
    setRightWidth(rightW);
  };

  // const leftButtonTouchEndHandler = (e) =>{
  //   setLeftButtonCloseVisible(true);
  //   setRightButtonOpenVisible(true);
  // }

  let resizer1 = (
    <ResizerFirst
      key="resizer1"
      id="first"
      onMouseOver={leftResizerMouseOverHandler}
      onTouchStart = {startResize}
      onTouchEnd = {stopResize}
      onTouchMove = {resizeFirst}
      // onTouchStart={leftResizerMouseOverHandler}
      // onTouchEnd = {leftButtonTouchEndHandler}
    >
      {leftButtonCloseVisible && (
        <LeftResizerCircleRightButton clickCloseHandler={firstPanelVisible} />
      )}
      {leftButtonOpenVisible && (
        <LeftResizerCircleLeftButton clickHandler={firstPanelHideable} />
      )}
    </ResizerFirst>
  );

  allParts.push(resizer1);

  let Middle = styled.div`
    width: ${middleWidth}px;
    // display: ${middleWidth === 0 ? "none" : ""};
    min-height: 1vh;
    background-color: aliceblue;
    overflow-y: auto;
  `;

  const middleSectionMouseOverHandler = (e) => {
    setLeftButtonOpenVisible(false);
    setLeftButtonCloseVisible(false);
    setRightButtonCloseVisible(false);
    setRightButtonOpenVisible(false);
  };

  const middleSection = (
    <Middle
      key="middle"
      id="middlepanel"
      onMouseOver={middleSectionMouseOverHandler}
    >
      {alphabet}
      {alphabet}
      {alphabet}
      {alphabet}
      {alphabet}
      {alphabet}
      {alphabet}
      {alphabet}
      {alphabet}
    </Middle>
  );
  allParts.push(middleSection);

  let ResizerSecond = styled.div`
    width: 5px;
    border-left: 1px solid black;
    position: relative;
    cursor: col-resize;
    flex-shrink: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `;

  const rightResizerMouseOverHandler = event => {
    if (rightWidth === 0) {
      setRightButtonCloseVisible(true);
    } else {
      setRightButtonOpenVisible(true);
      if(leftButtonCloseVisible || leftButtonOpenVisible){
        setLeftButtonOpenVisible(false);
        setLeftButtonCloseVisible(false);
      }
    }
  };

  // const rightButtonTouchEndHandler = (e) => {
  //   setLeftButtonCloseVisible(true);
  //   setRightButtonOpenVisible(true);
  //   // setRightButtonCloseVisible(true);
  // }

  const rightPanelHideable = (e) => {
    setRightButtonOpenVisible(false);
    let rightW = rightWidth;
    if (rightW > 0) {
      rightW = 0;
    }
    if(leftWidth === 0){
      setRightButtonCloseVisible(true);
    }
    let leftW = leftWidth;
    let middleW = w - resizerW - resizerW - rightW - leftWidth;
    setLeftWidth(leftW);
    setMiddleWidth(middleW);
    setRightWidth(rightW);
  };

  const rightPanelVisible = (e) => {
    setRightButtonCloseVisible(false);
    let rightW = rightWidth;
    if (rightW === 0) {
      rightW = 100;
    }
    let leftW = leftWidth;
    let middleW = w - resizerW - resizerW - rightW - leftWidth;
    setLeftWidth(leftW);
    setMiddleWidth(middleW);
    setRightWidth(rightW);
  };

  let resizer2 = (
    <ResizerSecond
      key="resizer2"
      id="second"
      onMouseOver={rightResizerMouseOverHandler}
      onTouchStart = {startResize}
      onTouchEnd = {stopResize}
      onTouchMove = {resizeFirst}

      // onTouchStart={rightResizerMouseOverHandler}
      // onTouchStart = {rightButtonTouchEndHandler}
    >
      {rightButtonOpenVisible && (
        <RightResizerCircleRightButton
          clickCloseHandlerRight={rightPanelHideable}
        />
      )}
      {rightButtonCloseVisible && (
        <RightResizerCircleLeftButton
          clickOpenHandlerRight={rightPanelVisible}
        />
      )}
    </ResizerSecond>
  );
  allParts.push(resizer2);

  let Right = styled.div`
    width: ${rightWidth}px;
    display: ${rightWidth === 0 ? "none" : ""};
    min-height: 1vh;
    overflow-y: auto;
    background-color: aliceblue;

  `;
  const rightSection = (
    <Right key="right" id="rightpanel">
      {alphabet}
    </Right>
  );
  allParts.push(rightSection);

  return <Container ref={containerRef}>{allParts}</Container>;
}

function ToolLayoutTest(props) {
  return (
    <div>
      <ToolLayoutExample deviceType={props.deviceType}/>
    </div>
  );
}


export default ToolLayoutTest;















































