import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';


const alphabet = "a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z ";
const Container = styled.div` 
 display:flex;
 height: 100vh;


`;

const Resizer = styled.div`
    width:6px;
    background-color:black;
    opacity: 0.5;
    position: relative;
    cursor: col-resize;
    flex-shrink: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;    
`;

function Example() {
    const [width, setWidth] = useState(window.innerWidth);
    //const [width, height] = useWindowSize();
    const leftW = 200;
    // check if props.right is present then default value otherwise 0
    const rightW = 300;
    const resizerW = 6;
    const middleW = width - leftW - rightW - resizerW - resizerW;
    const [leftWidth, setLeftWidth] = useState(leftW);
    const [rightWidth, setRightWidth] = useState(rightW);
    const [isResizing, setIsResizing] = useState(false);
    const [currentResizer, setCurrentResizer] = useState('');
    const [firstPanelHidden, setFirstPanelHidden] = useState(false);
    // const [toggleVisible, setToggleVisible] = useState(false);
    const [leftButtonVisible, setLeftButtonVisible] = useState(false);
    const [rightButtonVisible, setRightButtonVisible] = useState(false);

    const [middleWidth, setMiddleWidth] = useState(middleW);
    const containerRef = useRef();
    const leftButtonRef = useRef();

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        leftButtonRef.current.addEventListener('click', leftButtonClickHandler)
        containerRef.current.addEventListener('mousedown', startResize);
        containerRef.current.addEventListener('mousemove', resizeFirst);
        window.addEventListener('mouseup', stopResize);
        containerRef.current.addEventListener('mouseover', mouseOverHandler);
        containerRef.current.addEventListener('mouseout', mouseOutHandler);

        return () => {
            leftButtonRef.current.removeEventListener('click', leftButtonClickHandler)
            containerRef.current.removeEventListener('mousedown', startResize);
            containerRef.current.removeEventListener('mousemove', resizeFirst);
            window.removeEventListener('mouseup', stopResize);
            window.removeEventListener('resize', handleResize);
            containerRef.current.removeEventListener('mouseover', mouseOverHandler);
            containerRef.current.removeEventListener('mouseout', mouseOutHandler);
        }
    })

    const handleResize = () => {
        setWidth(window.innerWidth);
        setRightWidth(rightWidth);
        setLeftWidth(leftWidth);
        const middleW = width - leftWidth - rightWidth - 6 - 6;
        setMiddleWidth(middleW);
    }

    const startResize = (event) => {
        //event.stopPropagation();
        //event.preventDefault();
        //event.stopImmediatePropagation();
        // event.nativeEvent.stopxImmediatePropagation();
        console.log('mouseDown called', event.target.id);
        setCurrentResizer(event.target.id);
        setIsResizing(true);
    }

    const stopResize = (event) => {
        //event.stopPropagation();
        //event.preventDefault();
        // event.nativeEvent.stopImmediatePropagation();
        console.log('mouseUp called');
        setIsResizing(false);
        setCurrentResizer('');
    }


    const resizeFirst = (e) => {
        // console.log('mouseMove called', isResizing);
        if (isResizing) {
            // console.log(`e.clientX ${e.clientX}`);
            const w = width;

            if (currentResizer === 'first' ) {
                console.log('FIRST RESIZER');
                let leftW = e.clientX - resizerW / 2;
                let rightW = rightWidth;
                if (leftW < 50) {
                    // console.log('LESS than 50');
                    leftW = 0;
                    e.target.style.cursor = "e-resize";
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
                }
                else if (firstPanelHidden) {
                    setFirstPanelHidden(false);
                }
                let middleW = w - leftW - rightWidth - resizerW - resizerW;
                // check props.right is also present then only enter into this block
                if (middleW < 50) {
                    middleW = 0;
                    rightW = w - leftWidth - resizerW - resizerW - middleW;
                }
                setLeftWidth(leftW)
                setMiddleWidth(middleW);
                setRightWidth(rightW);

            } else if (currentResizer === 'second' ) {
                console.log('SECOND RESIZER');
                // console.log(`e.clientX ${e.clientX}`);
                let middleW = e.clientX - leftWidth - resizerW;
                let rightW = w - leftWidth - resizerW - middleW - resizerW;
                if (rightW < 50) {
                    rightW = 0;
                    middleW = w - leftWidth - resizerW - resizerW - rightW;
                    e.target.style.cursor = "w-resize";

                } else if (rightW < 100) {
                    rightW = 0;
                    middleW = w - leftWidth - resizerW - resizerW - rightW;
                    e.target.style.cursor = "col-resize";

                } else if (middleW < 50) {
                    middleW = 0;
                }else{
                    e.target.style.cursor = "col-resize";
  
                }
                setRightWidth(rightW);
                setMiddleWidth(middleW);
            }
        }
    }

    const mouseOverHandler = (e) => {
        // console.log(e.target.id)
        if (e.target.id === "leftpanel") {
            if (middleWidth === 0) {
                // event.target.nextSibling.style.display = "inline-block"
            }
            setLeftButtonVisible(true);
        }

        if (e.target.id === "rightpanel") {
            if (middleWidth === 0) {
                // event.target.previousSibling.style.display = "inline-block"
            }
            setRightButtonVisible(true);
        }

    }
    const mouseOutHandler = (e) => {
        // console.log(e.target.id)
        if (e.target.id === "leftpanel") {
            if (middleWidth === 0) {
                // event.target.nextSibling.style.display = "none";
                setLeftButtonVisible(false);
            }
        }
        if (e.target.id === "rightpanel") {
            if (middleWidth === 0) {
                // event.target.previousSibling.style.display = "none"

                setRightButtonVisible(false);
            }
        }
    }



    // const mouseOverHandler = (e) => {
    //     console.log('mouseOver called', toggleVisible);
    //     if (toggleVisible) {
    //         setToggleVisible(true);
    //     } else {
    //         setToggleVisible(true);
    //     }
    // }




    const allParts = [];
    let Left = styled.div`
    width: ${leftWidth}px;
  // display:${firstPanelHidden === true ? 'none' : ''}
    display:${leftWidth === 0 ? 'none' : ''}

  `;


    const buttonStyleHandler = (e) => {
        // console.log(e.target.nextSibling.children[0]);
        // e.target.nextSibling.children[0].style.display = 'inline-block';
        // if(middleWidth===0){
        //     event.target.nextSibling.style.display = "inline-block"
        // }
        // setLeftButtonVisible(true);
    }
    // const buttonOutHandler =(e)=>{
    //   console.log(e.target.nextSibling.children[0]);

    // //  e.target.nextSibling.children[0].style.display = 'none';
    // }

    const leftButtonMouseOutHandler = (e) => {
        console.log(event.target.nextSibling);
        if (middleWidth === 0) {
            event.target.nextSibling.style.display = "none";
            setLeftButtonVisible(false);
        }
    }

    const leftSection = <Left
        key="left"
        id="leftpanel"
    // onMouseOver={(e)=>buttonStyleHandler(e)}
    onMouseOut={(e)=>{leftButtonMouseOutHandler(e)}}
    >{alphabet}</Left>
    allParts.push(leftSection);


    let ToggleButtonLeft = styled.button`  
    position:absolute;
    top:45vh;
    color:white;
    background-color:black;
    border-radius:10px;
    display:${leftButtonVisible === true ? 'inline-block' : 'none'};   
    
  `;

    const leftButtonClickHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("button called");
    }
    const leftResizerMouseOverHandler = (e) => {
        if (leftWidth === 0) {
            setLeftButtonVisible(true);

        }
    }

    let resizer1 = <Resizer
        key='resizer1'
        id="first"
        onMouseOver={leftResizerMouseOverHandler}
    // onMouseOut={(e)=>{buttonOutHandler(e)}}

    >
        <ToggleButtonLeft
            ref={leftButtonRef}
            onClick={(e) => leftButtonClickHandler(e)}
        >
            <span>A</span>
        </ToggleButtonLeft>
    </Resizer>

    allParts.push(resizer1);


    let Middle = styled.div`
   width: ${middleWidth}px;
   display:${middleWidth === 0 ? 'none' : ''}

  `;

    const middleSectionMouseOverHandler = (e) => {
        setLeftButtonVisible(false);
        setRightButtonVisible(false)

    }

    const middleSection = <Middle key="middle"
        id="middlepanel"
        onMouseOver={middleSectionMouseOverHandler}
    ><p>a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z </p>
    </Middle>
    allParts.push(middleSection);

    let ToggleButtonRight = styled.button`  
    color:white;
    top:45vh;
    right:1px;
    position:absolute;
    border-radius:10px;
    background-color:black; 
    display:${rightButtonVisible === true ? 'inline-block' : 'none'};   
     
  `;

    const rightResizerMouseOverHandler = (e) => {
        if (rightWidth === 0) {
            setRightButtonVisible(true);
        }
    }

    // check if props.right is present then only add second resizer and right section.
    let resizer2 = <Resizer key='resizer2'
        id="second"

        onMouseOver={rightResizerMouseOverHandler}

    // ref={secondResizerRef}
    >
        <ToggleButtonRight><span>B</span></ToggleButtonRight>
    </Resizer>
    allParts.push(resizer2);

    let Right = styled.div`
    width: ${rightWidth}px;
    display:${rightWidth === 0 ? 'none' : ''}

    `;

    const buttonRightStyleHandler = (e) => {
        if (middleWidth === 0) {
            event.target.previousSibling.style.display = "inline-block"
        }
        setRightButtonVisible(true);
    }

    const rightButtonMouseOutHandler = (e) => {
        if (middleWidth === 0) {
            event.target.previousSibling.style.display = "none"

            setRightButtonVisible(false);
        }
    }
    const rightSection = <Right key="right"
        id="rightpanel"
    // onMouseOver={(e)=>buttonRightStyleHandler(e)}
    // onMouseOut={(e)=>{rightButtonMouseOutHandler(e)}}
    // // onMouseOver={rightResizerMouseOverHandler}
    >{alphabet}</Right>
    allParts.push(rightSection);

    return <Container ref={containerRef}>{allParts}</Container>
}
function ToolLayoutTest31() {
    return (
        <div>
            <Example />
        </div>
    );
}

export default ToolLayoutTest31;
