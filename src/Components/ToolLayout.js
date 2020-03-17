import React , { Component } from 'react';
import './page.css';
import ContentPanel from './ContentPanel';
import ToggleOverlay from './ToggleOverlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LeftNav from './LeftNav';
import ToolPanels from './ToolPanels';
import { DashboardPanel } from './DashboardPanel';


class ToolLayout extends Component{
  constructor(props){
    super(props);
    
  }
  
  


  render(){
   return(
     <React.Fragment>
       

       <ToolPanels>
        
         <div id="LeftNav">
           <LeftNav />
         </div>



         <div id="ContentPanel">
           <ContentPanel>
           <div>DoenetML text</div>
           </ContentPanel>
           <ContentPanel>
             <div style={{ display: 'block', textAlign:'center'}}>
               <img src="https://picsum.photos/400/200" ></img>
             </div>
           </ContentPanel>
           <ContentPanel>
             <div>DoenetML Graph</div>
           </ContentPanel>
         </div>



         <div>
           <div id="ToggleOverlayMenu">
             <ToggleOverlay />
           </div>
           <div id="DashboardPanel" style={{minHeight:'700px'}} >
             <DashboardPanel  className="margin-resize">
               <p>Notes 1 - Clipboard</p>
             </DashboardPanel>
             <DashboardPanel className="margin-resize">
               <p>Notes 2 - Clipboard</p>
             </DashboardPanel>
             <DashboardPanel className="margin-resize">
               <p>Notes 3 - Clipboard</p>
             </DashboardPanel>
           </div>
         </div>


       </ToolPanels>



       {/* <div id="PageContainer">


          <div id="LeftNav">
              <FontAwesomeIcon className="close_nav_icon" icon={leftNavCloseArrow} />
              <LeftNav />
            </div>
            <div id="ContentPanel">
              <ContentPanel>
                <p>test text </p>
              </ContentPanel>
              <ContentPanel>
                <img src="https://picsum.photos/400/200" style={{ display: 'block', margin: 'auto', marginTop: 'auto' }}></img>
              </ContentPanel>
              <ContentPanel>
                <div>Graph</div>
              </ContentPanel>
            </div>

            <div>
                  <div id="ToggleOverlayMenu">
                  </div>
                  <div id="DashboardPanel">
                  </div>
            </div> 
    </div>  */}

    

     </React.Fragment>
   );  
  }

}

export default ToolLayout;