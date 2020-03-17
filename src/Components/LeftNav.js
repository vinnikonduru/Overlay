import React, {Component} from 'react';
// import { useSpring, animated} from 'react-spring';
import Section from './Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft as leftNavCloseArrow} from '@fortawesome/free-solid-svg-icons';
// import { faChevronCircleRight as leftNavOpenArrow} from '@fortawesome/free-solid-svg-icons';

export default class LeftNav extends Component {

  constructor(props) {
    super(props);

    this.state= { 
      // show_tool_tip:false,
      show_left_nav:true,
      sectionList1: ['Section1', 'Section2', 'Section3'],
      sectionList2: ['Section4', 'Section5', 'Section6']
    }
  }
// _ClickHandler(){
// this.setState(state => ({
//   show_left_nav: !state.show_left_nav
// }));

// }
      

  render() {
    const { sectionList1, sectionList2 } = this.state
    return (
      <>
      <div>
        <FontAwesomeIcon onClick={this._ClickHandler} className="close_nav_icon" icon={leftNavCloseArrow} >   
        </FontAwesomeIcon>
      </div>
      <div style={{ minHeight: '800px' }}>
        <Section key='math' sectionList={sectionList1} />
        <Section key='science' sectionList={sectionList2} />
      </div>
      </>
    );
  }  
}

