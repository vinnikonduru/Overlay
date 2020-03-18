import React, { Component } from 'react';
import Section from './Section';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft as leftNavCloseArrow} from '@fortawesome/free-solid-svg-icons';


export default class LeftNavPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      show_left_nav_panel: true,
      sectionList1 : ['Section1', 'Section2', 'Section3'],
      sectionList2 : ['Section4', 'Section5', 'Section6'],

    }
  }
  render() {
    const {sectionList1, sectionList2} = this.state
    return (
      <>
      <div style={{minHeight:"700px"}}>
      <div>
        <FontAwesomeIcon icon={leftNavCloseArrow}></FontAwesomeIcon>
      </div>
      <div > 
        <Section key='math' sectionList = {sectionList1}/>
        <Section key='math1241' sectionList ={sectionList2}/>
      </div>
      </div>
     
      </>
    );
  }
}

