import React , {Component } from 'react';
import './page.css';

class DoenetPage extends Component{
  constructor(props){
    super(props);
    // let url_string = window.location.href;
    // var url = new URL(url_string);
    // this.contentId = url.searchParams.get("contentId");
    // this.branchId = url.searchParams.get("branchId");
    // this.doenetML = "";


    // let deviceGivenWidth = this.widthToDevice();
     
    // this.state={
    //   deviceGivenWidth:deviceGivenWidth,
    //   phone_panel_active: "Content",
    //   show_toggle_overlay: true,

    // }
    // this.windowResizeHandler = this.windowResizeHandler.bind(this);

    
  }
  // windowResizeHandler(){
  //   let deviceGivenWidth = this.widthToDevice();
  //   if (this.state.deviceGivenWidth !== deviceGivenWidth){
  //     this.setState({deviceGivenWidth: deviceGivenWidth});
  //   }
  // }

  // widthToDevice(){
  //   let w = document.documentElement.clientWidth;
  //   if (w >= 1024){ return "computer"; }
  //   if (w < 1024 && w >= 768){ return "tablet"; }
  //   return "phone";
  // }
  
  // componentDidMount(){
  //   window.addEventListener("resize",this.windowResizeHandler);
  // }

  // componentWillUnmount(){
  //   window.removeEventListener("resize",this.windowResizeHandler);
  // }


  render(){
   return(
     <React.Fragment>
     <div id="PageContainer">
       <div id="LeftNavMenu">
 
       </div>
       <div id="LeftNav">

       </div>

       <div id="ContentPanel">

       </div>
       <div id="ToggleOverlayMenu">
         
       </div>
       <div id="DashboardPanel"> 
         
       </div>
     </div>

     </React.Fragment>
   );  
  }

}

export default DoenetPage;