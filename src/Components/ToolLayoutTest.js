import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const alphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z ";
const Container = styled.div` 
 display:flex;
 height: 100vh;
 margin:0px;
 padding:0px;
//  overflow-y: hidden
`;

const Resizer = styled.div`
    width:6px;
    background-color:#c6ccc8;
    opacity: 0.2;
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
    const leftW = 200;
    const rightW = 300;
    const resizerW = 6;
    const middleW = w - leftW - rightW - resizerW - resizerW;
    const [leftWidth, setLeftWidth] = useState(leftW);
    const [middleWidth, setMiddleWidth] = useState(middleW);
    const [rightWidth, setRightWidth] = useState(rightW);
    const [isResizing, setIsResizing] = useState(false);
    const [currentResizer, setCurrentResizer] = useState('');
    const [firstPanelHidden, setFirstPanelHidden] = useState(false);

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
        // console.log('mouseMove called', isResizing);
        if (isResizing) {
            // console.log(`e.clientX ${e.clientX}`);
            const w = window.innerWidth;

            if (currentResizer === 'first') {
                console.log('FIRST RESIZER');
                let leftW = e.clientX - resizerW / 2;
                if (leftW < 50) {
                    // console.log('LESS than 50');
                    leftW = 0;
                    // setFirstPanelHidden(true);
                } else if (leftW < 100) {
                    // console.log('between 50 and 100');
                    leftW = 100;
                    // setFirstPanelHidden(false);
                } else if (leftW >= 300) {
                    leftW = 300;
                    // setFirstPanelHidden(false);
                }
                else if (firstPanelHidden) {
                    setFirstPanelHidden(false);
                }
                const middleW = w - leftW - rightWidth - resizerW - resizerW;
                setLeftWidth(leftW)
                setMiddleWidth(middleW);
                
            } else if (currentResizer === 'second') {
                console.log('SECOND RESIZER');
                // console.log(`e.clientX ${e.clientX}`);
                let middleW = e.clientX - leftWidth - resizerW;
                console.log(`middleWidth ${middleWidth}`);
                let rightW = w - leftWidth - resizerW - middleW - resizerW;
                // console.log(`rightW ${rightW}`);
                console.log(`rightWidth ${rightWidth}`);
                if (rightW < 50) {
                    rightW = 0;
                    middleW = w - leftWidth - resizerW - resizerW - rightW;
                    
                } else if (rightW < 100) {
                    rightW = 0;
                    middleW = w - leftWidth - resizerW - resizerW - rightW;
                } else if (middleW < 50){
                    middleW =0;
                }
                setRightWidth(rightW);
                setMiddleWidth(middleW);


            }
        }
    }



    const allParts = [];
    let Left = styled.div`
  width: ${leftWidth}px;
  // display:${firstPanelHidden === true ? 'none' : ''}
  display:${leftWidth === 0 ? 'none' : ''}

  `;
    const leftSection = <Left key="left">{alphabet}</Left>
    allParts.push(leftSection);

    let resizer1 = <Resizer
        key='resizer1'
        id="first"
    //  ref={firstResizerRef}
    ></Resizer>
    allParts.push(resizer1);

    let Middle = styled.div`
   width: ${middleWidth}px;
   display:${middleWidth === 0 ? 'none' : ''}

  `;
    const middleSection = <Middle key="middle">{alphabet}</Middle>
    allParts.push(middleSection);

    let resizer2 = <Resizer key='resizer2'
        id="second"
    // ref={secondResizerRef}
    >

    </Resizer>
    allParts.push(resizer2);

    let Right = styled.div`
    width: ${rightWidth}px;
    display:${rightWidth === 0 ? 'none' : ''}

    `;
    const rightSection = <Right key="right">{alphabet}</Right>
    allParts.push(rightSection);

    return <Container ref={containerRef}>{allParts}</Container>
}

function ToolLayoutTest() {
    return (
        <div>
            <Example />
        </div>
    );
}

export default ToolLayoutTest;
