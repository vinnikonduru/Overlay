import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ToolPanels from './ToolPanels';
import LeftNavPanel from './LeftNavPanel';
import ContentPanel from './ContentPanel';
import NotesPanel from './NotesPanel';

class ToolPanelSmall extends Component {
  constructor(){
    super();
    this.state = {
      deviceGivenWidth : this.widthToDevice(),
    }
    this.handlePhoneNavPanel = this.handlePhoneNavPanel.bind(this);
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
    ReactDOM.findDOMNode(this).addEventListener('resize', this.windowResizerHandler)

  }


  handlePhoneNavPanel(index){
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
        return <ContentPanel />
      case 2:
        return  <NotesPanel/>
      default:
        break;
    }
  }
  render() {
    return (
      <div>
      {this.state.deviceGivenWidth !== 'phone' ? (<ToolPanels>
               <div>
                 <LeftNavPanel />
               </div>
               <div>
                 <ContentPanel/>
               </div>
               <div>
                 <NotesPanel/>
               </div>

      </ToolPanels>) : (
        <React.Fragment>
         <div>
            {this.getSelectedTab()}
          </div>
          
          <div style={{display:'flex', bottom:'10px', textAlign:'center', width:'100%',position:'fixed',justifyContent:'center'}}>
            
            <button className="selected" onClick={() => this.handlePhoneNavPanel(0)}>Left Nav</button>
            <button  className="selected" onClick={() => this.handlePhoneNavPanel(1)}>Content Panel</button>
            <button className="selected" onClick={() => this.handlePhoneNavPanel(2)}>Notes panel</button>

          </div>
        </React.Fragment>
      )}
      </div>
    );
  }
}

export default ToolPanelSmall;