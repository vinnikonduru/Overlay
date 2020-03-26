import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
    display: flex;
    min-height: 100vh; 
    color: black;
    background-color:white;
`;

const Resizer = styled.div`
    border: 1px solid lightgray;
    position: relative;
    cursor: col-resize;
    flex-shrink: 0;
    -webkit-user-select: none;  
    -moz-user-select: none;     
    -ms-user-select: none;      
    user-select: none;   
    }
`;


export default function ComputerPanels(props) {

    const [firstSectionWidth, setFirstSectionWidth] = useState(150);
    const [secondSectionWidth, setSecondSectionWidth] = useState(600);
    const [thirdSectionWidth, setThirdSectionWidth] = useState(350);
    const [isDragging, setDragging] = useState(false);
    const [initialPosition, setInitialPosition] = useState(0);
    const [mouse_x, setmouse_x] = useState(0);
    const [activeResizer, setActiveResizer] = useState('');

    // console.log(`firstSectionWidth ${firstSectionWidth}`);
    // console.log(`secondSectionWidth ${secondSectionWidth}`);
    // console.log(`thirdSectionWidth ${thirdSectionWidth}`);
    // console.log(`mouse_x ${mouse_x}`);

    //TODO: can't use willunmount in useEffect (how to do here?)
    useEffect(() => {
        document.addEventListener('mousemove', (e) => {
            setmouse_x(e.clientX);
            // setInitialPosition(e.clientX);
            console.log(`activeResizer: ${activeResizer}`);
        });
    })

    let allSections = [];

    // First Section Start
    let FirstSectionDiv = styled.div`
    padding: 10px;
    width: ${firstSectionWidth}px; 
  `;
    const firstSection = <FirstSectionDiv key="firstSection" >{props.children[0]}</FirstSectionDiv>
    if (firstSectionWidth < 100) {
        allSections.push('')
        // setFirstSectionWidth(0);
    }
    else {
        allSections.push(firstSection)
    }

    const resizeFirst = () => {
        setDragging(true);
        setInitialPosition(mouse_x);
        console.log('InitialPosition', initialPosition);
        // const newDragWidth = mouse_x - initialPosition ;
        const newDragWidth = mouse_x;
        // set secondpanel - delta
        // set firstpanel + delta
        const secondWidth = secondSectionWidth - newDragWidth;
        const firstWidth = firstSectionWidth + newDragWidth;
        setFirstSectionWidth(firstWidth);
        setSecondSectionWidth(secondWidth);
        // setActiveResizer('first');  
    }

    // First Resizer start
    let firstResizer = <Resizer
        // onMouseDown={() => setActiveResizer('first')}
        onMouseDown={() => { resizeFirst() }}
        key="firstResizer"
    ></Resizer>

    allSections.push(firstResizer);

    // First Resizer ends

    //Second Section starts 
    //TODO: Can we use CSS to calculate width; auto without props
    let SecondSectionDiv = styled.div`
    padding: 50px;
    width: ${props => props.currentWidth};
`;
    let secondSection = <SecondSectionDiv key="secondSection" currentWidth={`calc(100% - ${firstSectionWidth}px - ${thirdSectionWidth}px)`}>{props.children[1]}</SecondSectionDiv>;
    allSections.push(secondSection);
    //Second Section ends

    const startSecondResizer = (e) => {
        setDragging(true);
        setInitialPosition(e.clientX);
    }

    const stopSecondResizer = () => {
        setDragging(false);
        setInitialPosition(0);
    }

    const resizeSecond = (event) => {
        if (isDragging === true) {
            console.log('InitialPosition', initialPosition);
            const newDragWidth = event.clientX - initialPosition;
            //  secondpanel - newWidth
            //  firstpanel + newWidth
            const thirdWidth = thirdSectionWidth - newDragWidth;
            const secondWidth = secondSectionWidth + newDragWidth;
            setThirdSectionWidth(thirdWidth);
            setSecondSectionWidth(secondWidth);
        }
    }

    //Second Resizer starts
    let secondResizer = <Resizer key="secondResizer"
        onMouseDown={() => setActiveResizer('second')}
    />
    allSections.push(secondResizer);
    //Second Resizer Ends

    //Third Section starts
    let ThirdSectionDiv = styled.div`
    padding: 10px;
    width: ${thirdSectionWidth}px;

`;
    let thirdSection = <ThirdSectionDiv key="thirdSection">{props.children[2]}</ThirdSectionDiv>;
    allSections.push(thirdSection)
    //Third Section ends

    return <LayoutContainer>{allSections}</LayoutContainer>
}
