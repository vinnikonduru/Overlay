import React, { Component } from 'react';
import ToolPanels from '../Components/ToolPanels';

class ToolLayout extends Component {
  constructor(props){
    super(props);

  }


  render() {
    return (
      <React.Fragment>
         <ToolPanels>
        <div>
         <p>1</p>
        </div>

        <div>
        <p>2</p>
        </div>
        
        <div>
        <p>3</p>
        </div>
      </ToolPanels>
      </React.Fragment>
     
      
    );
  }
}

export default ToolLayout;