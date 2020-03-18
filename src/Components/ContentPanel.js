import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEllipsisV as openMenuTool } from '@fortawesome/free-solid-svg-icons';

import './panel.css';



class ContentPanel extends Component {

  constructor(props) {
    super(props);

    this.state= { 
      show_tool_tip:false,
    
  }
  }

  render() {
    return (
      <div style={{border:'1px solid orange', minHeight:'300px', margin:'15px',position:'relative'}}>
            <FontAwesomeIcon icon={openMenuTool} onClick={()=> this.setState({show_tool_tip: !this.state.show_tool_tip})} style={{cursor:'pointer', position: 'absolute',top:'10px',right: '10px'}}/>
             {this.state.show_tool_tip && <div style={{ width: 'auto',minWidth:'80px',minHeight:'80px',backgrounColor: 'black',color: 'black',  textAlign: 'center',borderRadius: '6px', backgroundColor:'white',padding: '5px 0',
            /* Position the tooltip */
            position: 'absolute',zIndex: '1', top: '30px', right:'10px',border:'1px solid black', marginLeft: '-60px',
          }}> 
          <div className="checkboxes">
          <label for="one">
            <input type="checkbox" id="one" />Edit</label>
          <label for="two">
            <input type="checkbox" id="two" />Save</label>
          <label for="three">
            <input type="checkbox" id="three" />Send</label>
        </div> 
        </div>  

        }      
         {this.props.children}

        {/* //add icon */}

      </div>
    );
  }  
}

export default ContentPanel;