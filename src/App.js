import React, { Component } from 'react';
import './App.css';
import ToolLayoutTest from './Components/ToolLayoutTest'

// import ToolTest from './Components/ToolTest';
import ToolTest25 from './Components/ToolTest25';




class App extends Component {

  constructor(props) {
    super(props);
    
  }
      
  render() {
    return (
      <>
    <ToolLayoutTest/>
    {/* <ToolTest25/> */}
      </>
    );
  }  
}

export default App;