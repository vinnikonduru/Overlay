import React, { Component } from 'react';
import './App.css';
import ToolLayoutTest from './Components/ToolLayoutTest'

// import ToolTest from './Components/ToolTest';
// import ToolTest25 from './Components/ToolTest25';
// import ToolPanelsTest from './Components/ToolPanelsTest';




class App extends Component {

  constructor(props) {
    super(props);
    
  }
      
  render() {
    return (
      <>
    <ToolLayoutTest/>
    {/* <ToolPanelsTest/> */}
      </>
    );
  }  
}

export default App;