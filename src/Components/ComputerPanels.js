import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
    display: flex;
    min-height: 100vh; 
`;

const Resizer = styled.div`
    border: 5px solid #e4e7ed;
    position: relative;
    cursor: col-resize;
    flex-shrink: 0;
    -webkit-user-select: none;  
    -moz-user-select: none;     
    -ms-user-select: none;      
    user-select: none;
`;


export default function ComputerPanels(props) {
    var w = window.innerWidth;
    const [firstSectionWidth, setFirstSectionWidth] = useState(200);
    const [secondSectionWidth, setSecondSectionWidth] = useState(w-200);
    // const [thirdSectionWidth, setThirdSectionWidth] = useState(300);
    const [isResizing, setIsResizing] = useState(false);
    const [currentResizer, setCurrentResizer] = useState('');

    const containerRef = useRef();
    const firstRef = useRef();
    const secondRef = useRef();


    
    useEffect(() => {
        firstRef.current.addEventListener('mousedown', startResizeFirst);
        // secondRef.current.addEventListener('mousemove', resizeFirst);
        containerRef.current.addEventListener('mousemove',resizeFirst );
        containerRef.current.addEventListener('mouseup',stopResize );
        return () => {
            firstRef.current.removeEventListener('mousedown', startResizeFirst);
        // secondRef.current.addEventListener('mousemove', resizeFirst);
        containerRef.current.removeEventListener('mousemove',resizeFirst );
        containerRef.current.removeEventListener('mouseup',stopResize );
        }
    }, [])


    const startResizeFirst = (event) => {
        console.log('mouseDown called', event.target.id);
        setIsResizing(true);
        setCurrentResizer('first');
    }


    const stopResize = (event) => {
        console.log('mouseUp called');
        setIsResizing(false);
        setCurrentResizer('');
    }

    const resizeFirst = (event) => {
        console.log('mouseMouse called', isResizing);
        if (isResizing){
            console.log(`e.clientX ${e.clientX}`);
            if(currentResizer === 'first'){
                const w = window.innerWidth;
                setFirstSectionWidth(e.clientX);
                setSecondSectionWidth(w-e.clientX);
            }
        }
    }


    const allSections = [];

    let FirstSectionDiv = styled.div`
    width: ${firstSectionWidth}px; 
  `;
    const firstSection = <FirstSectionDiv key="firstSection" >{props.children[0]}</FirstSectionDiv>
    
    if (firstSectionWidth <= 100) {
        allSections.push('')
    }
    else {
        allSections.push(firstSection);
    }
 
   
    let firstResizer = <Resizer ref={firstRef}
                                key="firstResizer"
                                id="first">       
                       </Resizer>

    allSections.push(firstResizer);




    let SecondSectionDiv = styled.div`
    width: ${secondSectionWidth};
`;
    let secondSection = <SecondSectionDiv key="secondSection" >{props.children[1]}</SecondSectionDiv>;
    allSections.push(secondSection);
   
 
//     let secondResizer = <Resizer ref={firstRef}
//                                 key="secondResizer"
//                                 id="second">       
//                        </Resizer>

//     allSections.push(firstResizer);

//     let ThirdSectionDiv = styled.div`
//     width: ${thirdSectionWidth}px;

// `;

//     const thirdSection = <ThirdSectionDiv key="thirdSection">{props.children[2]}</ThirdSectionDiv>;
//     allSections.push(thirdSection)

    return <LayoutContainer ref={containerRef}>{allSections}</LayoutContainer>
}




























  // const stopResizeFirst = (event) => {
    //     setIsResizing(false);
    //     setInitialPosition(0);
    //     setCurrentResizer('');
    //     setFirstNewDelta(0)
    //     //event.target.style.position = 'relative';
    // }



    // const stopResizeSecond = (event) => {
    //     setIsResizing(false);
    //     setInitialPosition(0);
    //     setCurrentResizer('');
    //     //setSecondNewDelta(0);
    // }
     // set secondpanel - delta
            // set firstpanel + delta
            // const thirdWidth = event.pageX - thirdDiv.current.getBoundingClientRect().left + 'px';
            // const secondWidth = event.pageX + secondDiv.current.getBoundingClientRect().left + 'px'



               //e.target.style.left = e.pageX - e.target.offsetWidth / 2 + 'px';
        //e.target.style.top = e.pageY - e.target.offsetHeight / 2 + 'px';