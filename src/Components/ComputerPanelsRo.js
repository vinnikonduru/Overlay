import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
    display: flex;
    min-height: 100vh;
    border: 1px solid black;
`;

const Resizer = styled.div`
    border: 3px solid darkGray;
    background: darkGray;
    position: relative;
    cursor: col-resize;
    flex-shrink: 0;
    -webkit-user-select: none;  
    -moz-user-select: none;    
    -ms-user-select: none;      
    user-select: none;
`;


export default function ComputerPanels(props) {
    const [firstSectionWidth, setFirstSectionWidth] = useState(200);
    //console.log(`firstSectionWidth ${firstSectionWidth}`);
    const [secondSectionWidth, setSecondSectionWidth] = useState(800);
    //console.log(`secondSectionWidth ${secondSectionWidth}`);
    const [thirdSectionWidth, setThirdSectionWidth] = useState(300);
    //console.log(`thirdSectionWidth ${thirdSectionWidth}`);
    //const [firstResize, setFirstResize] = useState(false);
    const [isDragging, setDragging] = useState(false);
    const [initialPosition, setInitialPosition] = useState(0);
    const [currentResizer, setCurrentResizer] = useState('');
    const [firstNewDelta, setFirstNewDelta] = useState(0);
    const [SecondNewDelta, setSecondNewDelta] = useState(0);

    const firstResizerRef = useRef();
    const secondResizerRef = useRef();


    let allSections = [];

    // First Section Start
    let FirstSectionDiv = styled.div`
    padding: 10px;
    width: ${firstSectionWidth}px;
  `;
    const firstSection = <FirstSectionDiv id='firstPanel' key="firstSection" >{props.children[0]}</FirstSectionDiv>
    if (firstSectionWidth <= 199) {
        allSections.push('')
    }
    else {
        allSections.push(firstSection)
    }
    // First Section ends

    const startResizeFirst = (e) => {
        setDragging(true);
        setInitialPosition(e.clientX);
        setCurrentResizer('first');
        //event.target.style.position = 'absolute';
    }

    const stopResizeFirst = (event) => {
        setDragging(false);
        setInitialPosition(0);
        setCurrentResizer('');
        setFirstNewDelta(0)
        //event.target.style.position = 'relative';
    }

    const resizeFirst = (event) => {
        if (isDragging === true) {
            //event.target.left = pageX - event.target.offsetLeft;
            console.log('InitialPosition', initialPosition);
            console.log('current resizer', currentResizer);
            const newDelta = event.clientX - initialPosition;
            // set secondpanel - delta
            // set firstpanel + delta
            const secondWidth = secondSectionWidth - newDelta;
            const firstWidth = firstSectionWidth + newDelta;
            setFirstNewDelta(newDelta);
            setFirstSectionWidth(firstWidth);
            setSecondSectionWidth(secondWidth);
        }
    }
    useEffect(() => {
        firstResizerRef.current.addEventListener('mousedown', startResizeFirst);
        firstResizerRef.current.addEventListener('mouseup', stopResizeFirst);
        return () => {
            firstResizerRef.current.removeEventListener('mousedown', startResizeFirst);
            firstResizerRef.current.removeEventListener('mouseup', stopResizeFirst);
        }

    })
    // First Resizer start
    const firstResizer = <Resizer ref={firstResizerRef}
        onMouseMove={(e) => resizeFirst(e)}
        key="firstResizer"
    ></Resizer>

    allSections.push(firstResizer);

    // First Resizer ends

    //Second Section starts
    let SecondSectionDiv = styled.div`
    padding: 20px;
    width: ${props => props.currentWidth};
`;
    let secondSection = <SecondSectionDiv id='secondPanel' key="secondSection" currentWidth={`calc(100% - ${firstSectionWidth}px - ${thirdSectionWidth}px)`}>{props.children[1]}</SecondSectionDiv>;
    allSections.push(secondSection);
    //Second Section ends
    const startResizeSecond = (e) => {
        e.preventDefault();
        setDragging(true);
        setInitialPosition(e.clientX);
        setCurrentResizer('second');
        //e.target.style.left = e.pageX - e.target.offsetWidth / 2 + 'px';
        //e.target.style.top = e.pageY - e.target.offsetHeight / 2 + 'px';
    }

    const stopResizeSecond = (event) => {
        event.preventDefault();
        setDragging(false);
        setInitialPosition(0);
        setCurrentResizer('');
        //setSecondNewDelta(0);
    }

    const resizeSecond = (event) => {
        if (isDragging === true) {
            console.log('InitialPosition', initialPosition);
            console.log('current resizer', currentResizer);
            const newDelta = event.clientX - initialPosition;
            // set secondpanel - delta
            // set firstpanel + delta
            // const thirdWidth = event.pageX - thirdDiv.current.getBoundingClientRect().left + 'px';
            // const secondWidth = event.pageX + secondDiv.current.getBoundingClientRect().left + 'px'

            const thirdWidth = thirdSectionWidth - newDelta;
            const secondWidth = secondSectionWidth + newDelta;
            //setSecondNewDelta(newDelta);
            setThirdSectionWidth(thirdWidth);
            setSecondSectionWidth(secondWidth);
        }
    }
    useEffect(() => {
        secondResizerRef.current.addEventListener('mousedown', startResizeSecond);
        secondResizerRef.current.addEventListener('mouseup', stopResizeSecond);
        secondResizerRef.current.addEventListener('mousemove', resizeSecond);
        return () => {
            secondResizerRef.current.removeEventListener('mousedown', startResizeSecond);
            secondResizerRef.current.removeEventListener('mousemove', stopResizeSecond);
            secondResizerRef.current.removeEventListener('mouseup', resizeSecond);
        }
    })

    //Second Resizer starts
    let secondResizer = <Resizer
        ref={secondResizerRef}
        key="secondResizer"
        onMouseMove={resizeSecond}
    // left={currentResizer === 'second' ? SecondNewDelta : 0}
    />
    allSections.push(secondResizer);
    //Second Resizer Ends

    //Third Section starts
    let ThirdSectionDiv = styled.div`
    padding: 20px;
    width: ${thirdSectionWidth}px;

`;


    let thirdSection = <ThirdSectionDiv key="thirdSection">{props.children[2]}</ThirdSectionDiv>;
    allSections.push(thirdSection)
    //Third Section ends

    return <LayoutContainer>{allSections}</LayoutContainer>
}
