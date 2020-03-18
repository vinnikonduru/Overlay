import React, { Component } from 'react';
import ToolPanels from '../Components/ToolPanels';
import LeftNavPanel from './LeftNavPanel';
import ContentPanelContent from './ContentPanelContent';
import NotesClipPanel from './NotesClipPanel';

class ToolLayout extends Component {
  constructor(){
    super();
    this.state = {
      selectedIndex: 1,
      show_left_nav_panel:true,

      deviceGivenWidth : this.widthToDevice(),
    }
    this.handleClick = this.handleClick.bind(this);
    this.windowResizerHandler = this.windowResizerHandler.bind(this);
    this.getSelectedTab = this.getSelectedTab.bind(this);
  }

  windowResizerHandler(){
    let deviceGivenWidth = this.widthToDevice();
    if (this.state.deviceGivenWidth != deviceGivenWidth) {
      this.setState({deviceGivenWidth: deviceGivenWidth});
    }
  }

  widthToDevice(){
    let w = document.documentElement.clientWidth;
    if (w >= 1024) {return "computer";}
    if(w < 1024 && w>=768) {return "tablet";}
    return "phone";
  }
  componentDidMount(){
    window.addEventListener("resize", this.windowResizerHandler);
  }

  componentWillMount(){
    window.removeEventListener("resize", this.windowResizerHandler);
  }
  handleClick(index){
    console.log("index", index)
    this.setState(state => ({
      selectedIndex: index
    }));
  }
  getSelectedTab(){
    switch (this.state.selectedIndex) {
      case 0:
        return <LeftNavPanel />
      case 1:
        return <ContentPanelContent />
      case 2:
        return <NotesClipPanel />
      default:
        break;
    }
  }
  render() {
    let left_nav_panel_style = {};
    let page_content_panel_style = {};

    let notes_panel_style = {};


    
    

    return (
     <div id="layoutContainer" className="layout-container">
       {this.state.deviceGivenWidth !== 'phone' ? (
       <ToolPanels>
                <div style={left_nav_panel_style} id="leftNavPanel" className="left-nav-panel">
                  <LeftNavPanel />
                </div>
                <div style={page_content_panel_style} id="pageContentPanel" className="page-content-panel">
                  <ContentPanelContent />
                </div>
                <div style={notes_panel_style} id="notesClipPanel" className="notes-clip-panel">
                  <NotesClipPanel/>

                </div>

       </ToolPanels>) : (
         <React.Fragment>
           <div>
             {this.getSelectedTab()}
           </div>
           <div style={{display:'flex', bottom:'10px', textAlign:'center', width:'100%',position:'fixed',justifyContent:'center'}}>
             <button className="selected" onClick={() => this.handleClick(0)}>Left Nav</button>
             <button  className="selected" onClick={() => this.handleClick(1)}>Content Panel</button>
             <button className="selected" onClick={() => this.handleClick(2)}>Notes panel</button>

           </div>
         </React.Fragment>
       )}
     </div>
     
      
    );
  }
}

export default ToolLayout;