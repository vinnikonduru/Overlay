import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const alphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z ";
const Container = styled.div` 
 display:flex;
 height: 100vh;
 margin:0px;
 padding:0px;
`;

const Resizer = styled.div`
    border: 5px solid #c6ccc8;
    opacity: 0.1;
    position: relative;
    cursor: col-resize;
    flex-shrink: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;    
`;

function Example() {
  var w = window.innerWidth;
  const [leftWidth, setLeftWidth] = useState(200);
  const [middleWidth, setMiddleWidth] = useState(w - 200);
  // const [rightWidth, setRightWidth] = useState(400);

  
  const [isResizing, setIsResizing] = useState(false);
  const [currentResizer, setCurrentResizer] = useState('');

  const containerRef = useRef();
  // const firstResizerRef = useRef();
  // const secondResizerRef = useRef();

  useEffect(() => {
    // firstResizerRef.current.addEventListener('mousedown', startResize);
    //secondResizerRef.current.addEventListener('mousedown', startResize);
    containerRef.current.addEventListener('mousedown', startResize);
    containerRef.current.addEventListener('mousemove', resizeFirst);
    containerRef.current.addEventListener('mouseup', stopResize);
    return () => {
      // firstResizerRef.current.removeEventListener('mousedown', startResize);
      //  secondResizerRef.current.removeEventListener('mousedown', startResize);
      containerRef.current.removeEventListener('mousedown', startResize);
      containerRef.current.removeEventListener('mousemove', resizeFirst);
      containerRef.current.removeEventListener('mouseup', stopResize);
    }
  })

  const startResize = (event) => {
    console.log('mouseDown called', event.target.id);
    setCurrentResizer(event.target.id);
    setIsResizing(true);
  }

  const stopResize = (event) => {
    console.log('mouseUp called');
    setIsResizing(false);
    setCurrentResizer('');
  }

  
  const resizeFirst = (e) => {
    console.log('mouseMove called', isResizing);
    if (isResizing) {
      console.log(`e.clientX ${e.clientX}`);
      if (currentResizer === 'first') {
        const w = window.innerWidth;
        setLeftWidth(e.clientX)
        setMiddleWidth(w - e.clientX);
      }
      // if (currentResizer === 'second') {
      //   const w = window.innerWidth;
      //   setMiddleWidth(e.clientX)
      //   setRightWidth(w - e.clientX);
      // }
    }
  }

 

  const allParts = [];
  let Left = styled.div`
  width: ${leftWidth}px;
  `;
  const leftSection = <Left key="left">{alphabet}</Left>
   
  if (leftWidth <100){
    allParts.push('')
  }else{
    allParts.push(leftSection);
  }

  // allParts.push(leftSection);
  let resizer1 = <Resizer 
  key='resizer1' 
  id="first"
  //  ref={firstResizerRef}
  ></Resizer>
  allParts.push(resizer1);

  let Middle = styled.div`
   width: ${middleWidth}px;
  `;
  const middleSection = <Middle key="middle">{alphabet}</Middle>
  allParts.push(middleSection);

  // let resizer2 = <Resizer key='resizer2' 
  // id="second" 
  // // ref={secondResizerRef}
  // >

  // </Resizer>
  // allParts.push(resizer2);

  // let Right = styled.div`
  //   width: ${rightWidth}px;
  //   `;
  // const rightSection = <Right key="right">{alphabet}</Right>
  // allParts.push(rightSection);

  return <Container ref={containerRef}>{allParts}</Container>
}

function ToolTest() {
  return (
    <div>
      <Example />
    </div>
  );
}

export default ToolTest;