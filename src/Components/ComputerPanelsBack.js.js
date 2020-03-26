import React, {useState} from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
    display: flex;
    min-height: 100vh; 
    border: 1px solid black;
`;

const Resizer = styled.div`
    border: 3px solid gray;
    background: darkGray;
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

  const [firstSectionWidth,setFirstSectionWidth] = useState([200]);
  
  console.log(`firstSectionWidth ${firstSectionWidth}`);
  
  // [secondSectionWidth,setSecondSectionWidth] = useState(therest);
  const [thirdSectionWidth,setThirdSectionWidth] = useState(400);
  console.log(`thirdSectionWidth ${thirdSectionWidth}`);


    let allSections = [];
    let FirstSectionDiv = styled.div`
    background: white;
    padding: 10px;
    width: ${firstSectionWidth}px; 
`;

    let firstSection = <FirstSectionDiv key="firstSection" >{props.children[0]}</FirstSectionDiv>;
    allSections.push(firstSection)

    // let firstResizer = <Resizer onMouseDown={(e) => this.startResize(e, i + 1)}
    //                 key={"resizer_" + i}
    //                 style={this.state.currentPanel === i + 1 ? { left: this.state.delta } : {}}
    //             ></Resizer>

    let firstResizer = <Resizer onMouseDown={(e) => {

      console.log(`e.clientX ${e.clientX}`);
      
        // if (e.clientX < 200){
        //   setFirstSectionWidth(0);
        // }else{
        //   setFirstSectionWidth(e.clientX);
        // }

    }}/>

    allSections.push(firstResizer);
    let SecondSectionDiv = styled.div`
    background: white;
    padding: 10px;
    width: auto; 
`;
    let secondSection = <SecondSectionDiv key="secondSection">{props.children[1]}</SecondSectionDiv>;
    allSections.push(secondSection)
    let secondResizer = <Resizer key="secondResizer" />
    allSections.push(secondResizer);
    let ThirdSectionDiv = styled.div`
    background: white;
    padding: 10px;
    width: 400px; 
`;

    let thirdSection = <ThirdSectionDiv key="thirdSection">{props.children[2]}</ThirdSectionDiv>;
    allSections.push(thirdSection)

  return <LayoutContainer>{allSections}</LayoutContainer>
}
     
        
       
//  this.state = {
//             isDragging: false,
//             panels: [200, 600, 400],
//             deviceGivenWidth : this.widthToDevice(),

//         }
//         this.handlePhoneNavPanel = this.handlePhoneNavPanel.bind(this);
//         this.stopResize = this.stopResize.bind(this);
//         this.startResize = this.startResize.bind(this);
//         this.resizePanel = this.resizePanel.bind(this);
//         this.windowResizerHandler = this.windowResizerHandler.bind(this);
    // }
  //   windowResizerHandler(){
  //     let deviceGivenWidth = this.widthToDevice();
  //     // if (this.state.deviceGivenWidth != deviceGivenWidth) {
  //     //   this.setState({deviceGivenWidth: deviceGivenWidth});
  //     // }
  //     if (this.state.deviceGivenWidth === 'tablet'){
  //       this.setState({ panels : [150,600,300]});
  //     }
  //     if (this.state.deviceGivenWidth === 'computer'){
  //       this.setState({ panels : [200,600,400]});
  //     }
      
  //   }
  //   widthToDevice(){
  //     let w = document.documentElement.clientWidth;
  //     if (w >= 1024) {return "computer";}
  //     if(w < 1024 && w>=768) {return "tablet";}
  //     return "phone";
  //   }
  //   componentDidMount() {
  //       ReactDOM.findDOMNode(this).addEventListener('mousemove', this.resizePanel)
  //       ReactDOM.findDOMNode(this).addEventListener('mouseup', this.stopResize)
  //       ReactDOM.findDOMNode(this).addEventListener('mouseleave', this.stopResize)
  //       window.addEventListener('resize', this.windowResizerHandler);
        
  //   }
  //   handlePhoneNavPanel(index){
  //       console.log("index", index)
  //       this.setState(state => ({
  //         columnIndex: index
  //       }));
  //     }
  //     getSelectedTab(){
  //       switch (this.state.columnIndex) {
  //         case 0:
  //           return <LeftNavPanel />
  //         case 1:
  //           return <ContentPanel />
  //         case 2:
  //           return  <NotesPanel/>
  //         default:
  //           break;
  //       }
  //     }



  //   stopResize() {
  //     if (this.state.isDragging) {
  //         console.log(this.state)
  //         this.setState(({ panels, currentPanel, delta }) => ({
  //             isDragging: false,
  //             panels: {
  //                 ...panels,
  //                 [currentPanel]: (panels[currentPanel] || 0) - delta,
  //                 [currentPanel - 1]: (panels[currentPanel - 1] || 0) + delta
  //             },
  //             delta: 0,
  //             currentPanel: null
  //         }))
  //     }
  // }

  // resizePanel(event) {
  //     if (this.state.isDragging) {
  //         const delta = event.clientX - this.state.initialPos
  //         this.setState({
  //             delta: delta
  //         })
  //     }
  // }
  
  // startResizeFirst(event) {
  //   if (event.clientX < 200){
  //     setFirstSectionWidth(0);
  //   }else{
  //     setFirstSectionWidth(event.clientX);
  //   }
  //   }

    // render() {
  

      //   const rest = this.props.children.slice(1)
      //   if (this.state.deviceGivenWidth === 'computer'){
      //     return <LayoutContainer onMouseUp={() => this.stopResize()}>
      //     <Panel width={this.state.panels[0] + 'px'}>
      //         {this.props.children[0]}
      //     </Panel>
      //     {[].concat(...rest.map((child, i) => {
      //         return [
      //             <Resizer onMouseDown={(e) => this.startResize(e, i + 1)}
      //                 key={"resizer_" + i}
      //                 style={this.state.currentPanel === i + 1 ? { left: this.state.delta } : {}}
      //             ></Resizer>,
      //             <Panel
      //                 key={"panel_" + i}
      //                 width={i === 0 ? `calc(100% - ${this.state.panels[0]}px - ${this.state.panels[2]}px)` : this.state.panels[i + 1] + 'px'}>
      //                 {child}
      //             </Panel>
      //         ]
      //     }))}
      // </LayoutContainer>

        // }else if (this.state.deviceGivenWidth === 'tablet'){
        //   return 'tablet'
        // }else{
        //   //phone
        //   return 'phone'
        // }


        // return (
        //     <div> {this.state.deviceGivenWidth != 'phone'? 
        //     (<LayoutContainer onMouseUp={() => this.stopResize()}>
        //         <Panel width={this.state.panels[0] + 'px'}>
        //             {this.props.children[0]}
        //         </Panel>
        //         {[].concat(...rest.map((child, i) => {
        //             return [
        //                 <Resizer onMouseDown={(e) => this.startResize(e, i + 1)}
        //                     key={"resizer_" + i}
        //                     style={this.state.currentPanel === i + 1 ? { left: this.state.delta } : {}}
        //                 ></Resizer>,
        //                 <Panel
        //                     key={"panel_" + i}
        //                     width={i === 0 ? `calc(100% - ${this.state.panels[0]}px - ${this.state.panels[2]}px)` : this.state.panels[i + 1] + 'px'}>
        //                     {child}
        //                 </Panel>
        //             ]
        //         }))}
        //     </LayoutContainer>):(
        //         <>
        //          <div>
        //      {this.getSelectedTab()}
        //    </div>
           
        //    <div style={{display:'flex', bottom:'10px', textAlign:'center', width:'100%',position:'fixed',justifyContent:'center'}}>
             
        //      <button className="selected" onClick={() => this.handlePhoneNavPanel(0)}>Left Nav</button>
        //      <button  className="selected" onClick={() => this.handlePhoneNavPanel(1)}>Content Panel</button>
        //      <button className="selected" onClick={() => this.handlePhoneNavPanel(2)}>Notes panel</button>

        //    </div>
        //         </>
        //     )}</div>
           
        // )
    // }







    /////////////////////////////////////////////

    import React, {useState, useEffect} from 'react';
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
    }
`;


export default function ComputerPanels(props) {

  const [firstSectionWidth,setFirstSectionWidth] = useState(100); 
  console.log(`firstSectionWidth ${firstSectionWidth}`);
  const [secondSectionWidth,setSecondSectionWidth] = useState(800);
  console.log(`secondSectionWidth ${secondSectionWidth}`);
  const [thirdSectionWidth,setThirdSectionWidth] = useState(300);
  console.log(`thirdSectionWidth ${thirdSectionWidth}`);
  const [firstResize,setFirstResize] = useState(false);
  const [isDragging, setDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState(0);


  let allSections = [];

  // First Section Start
  let FirstSectionDiv = styled.div`
    padding: 10px;
    width: ${firstSectionWidth}px; 
  `;
  const firstSection = <FirstSectionDiv key="firstSection" >{props.children[0]}</FirstSectionDiv>;
  if (firstSectionWidth <= 199) {
    allSections.push('')
  }
  else {
    allSections.push(firstSection)
  }
  // First Section ends

  const startResizeFirst = (e) => {
    // setFirstSectionWidth(200);
    if(e.clientX <200){
      setFirstSectionWidth(0);
    }else{
      setFirstSectionWidth(event.clientX);
    }

  }

  const stopResizeFirst = (event) => {
    console.log(`event.clientX ${event.clientX}`);
    if (event.clientX) {

      setFirstSectionWidth(event.clientX);
    }
  }

  const resizeFirst = (event) => {
    let firstResize = true;
    console.log(`event.clientX ${event.clientX}`)
    if (event.clientX) {
      const dragWidth = event.clientX - props.initialPos
      setFirstResize({
        dragWidth: dragWidth,
      })
    }
  }
  useEffect(()=> {
    window.addEventListener('mousedown', startResizeFirst);
    window.addEventListener('mouseup', stopResizeFirst);
    window.addEventListener('mouseleave', stopResizeFirst);
    window.addEventListener('mousemove', resizeFirst);

    return () => { 
        window.removeEventListener('mousedown', startResizeFirst);
        window.removeEventListener('mouseleave', stopResizeFirst);
        window.removeEventListener('mouseup', stopResizeFirst);
        window.removeEventListener('mousemove', resizeFirst);

  }

  })
  // const resizeFirst = (event) => {
  //   let firstResize = true;
  //   console.log(`event.clientX ${event.clientX}`)
  //   if (event.clientX) {
  //     const dragWidth = event.clientX - props.initialPos
  //     setFirstResize({
  //       dragWidth: dragWidth,
  //     })
  //   }
  // }
// First Resizer start
  const firstResizer = <Resizer onMouseDown={(e) => startResizeFirst(e)}
    onMouseUp={(e) => stopResizeFirst(e)}
    onMouseMove={(e) => resizeFirst(e)}

    key="firstResizer"
    style={firstResizer === 100 ? { left: props.firstSectionWidth } : {}}
  ></Resizer>

  allSections.push(firstResizer);

  // First Resizer ends

  //Second Section starts
  let SecondSectionDiv = styled.div`
    padding: 20px;
    width: ${props => props.currentWidth}; 

`;
  let secondSection = <SecondSectionDiv key="secondSection" currentWidth={`calc(100% - ${firstSectionWidth}px - ${thirdSectionWidth}px)`}>{props.children[1]}</SecondSectionDiv>;
  allSections.push(secondSection);
  //Second Section ends



  //Second Resizer starts
  let secondResizer = <Resizer key="secondResizer" />
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

    