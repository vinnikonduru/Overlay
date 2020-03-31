import React, { Component } from 'react';
import ComputerPanels from './ComputerPanels.js';
// import ComputerPanelsRo from './ComputerPanelsRo.js';

import LeftNavPanel from './LeftNavPanel';
import ContentPanel from './ContentPanel';
import NotesPanel from './NotesPanel';

class ToolLayout extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 1,
      show_left_nav_panel: true,
      deviceGivenWidth: this.widthToDevice(),
    }
    this.windowResizerHandler = this.windowResizerHandler.bind(this);
  }

  windowResizerHandler() {
    let deviceGivenWidth = this.widthToDevice();
    if (this.state.deviceGivenWidth != deviceGivenWidth) {
      this.setState({ deviceGivenWidth: deviceGivenWidth });
    }
  }

  widthToDevice() {
    let w = document.documentElement.clientWidth;
    if (w >= 1024) { return "computer"; }
    if (w < 1024 && w >= 768) { return "tablet"; }
    return "phone";
  }
  componentDidMount() {
    window.addEventListener('resize', this.windowResizerHandler)

  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.windowResizeHandler);
  }


  render() {

    if (this.state.deviceGivenWidth === 'computer') {
      return (
        
        <ComputerPanels>
       

         <LeftNavPanel />

        <ContentPanel />

        <NotesPanel /> 

      </ComputerPanels>
      )

    } else if (this.state.deviceGivenWidth === 'tablet') {
      return 'tablet'
    } else {
      //phone
      return 'phone'
    }

  }
}

export default ToolLayout;





















    // return (
    // <div>
    //    {this.state.deviceGivenWidth !== 'phone' ? (
    //    <ComputerPanels>
    //             <div>
    //               <LeftNavPanel />
    //             </div>

    //             <div>
    //               <ContentPanel/>
    //             </div>

    //             <div>
    //               <NotesPanel/>
    //             </div>

    //    </ComputerPanels>) : (
    //      <React.Fragment>
    //       <div>
    //          {this.getSelectedTab()}
    //        </div>

    //        <div style={{display:'flex', bottom:'10px', textAlign:'center', width:'100%',position:'fixed',justifyContent:'center'}}>

    //          <button className="selected" onClick={() => this.handlePhoneNavPanel(0)}>Left Nav</button>
    //          <button  className="selected" onClick={() => this.handlePhoneNavPanel(1)}>Content Panel</button>
    //          <button className="selected" onClick={() => this.handlePhoneNavPanel(2)}>Notes panel</button>

    //        </div>
    //      </React.Fragment>
    //    )}
    //    </div>

    //  <div id="layoutContainer" className="layout-container">
    //    {this.state.deviceGivenWidth !== 'phone' ? (
    //    <ComputerPanels>
    //             <div >
    //               <p>1</p>
    //               {/* <LeftNavPanel /> */}
    //             </div>
    //             <div>
    //             <p>2</p>

    //               {/* <ContentPanelContent /> */}
    //             </div>
    //             <div>
    //             <p>3</p>

    //               {/* <NotesClipPanel/> */}

    //             </div>

    //    </ComputerPanels>) : (
    //      <React.Fragment>
    //       <div>
    //          {this.getSelectedTab()}
    //        </div>


    //        <div style={{display:'flex', bottom:'10px', textAlign:'center', width:'100%',position:'fixed',justifyContent:'center'}}>

    //          <button className="selected" onClick={() => this.handlePhoneNavPanel(0)}>Left Nav</button>
    //          <button  className="selected" onClick={() => this.handlePhoneNavPanel(1)}>Content Panel</button>
    //          <button className="selected" onClick={() => this.handlePhoneNavPanel(2)}>Notes panel</button>

    //        </div>



    //      </React.Fragment>
    //    )}
    //  </div>



//   }
// }

// export default ToolLayout;