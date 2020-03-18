import React , {Component}  from 'react';
import Accordion from './Accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';

export default class Section extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { key, sectionList } = this.props;

    return (
      <Accordion key={key}>
              <div label="Section" >
                <ul style={{"paddingLeft":"20px","margin":"5px 0 0 0",listStyle:'none',color:'orange'}}>
                  { sectionList.map((section) => {
                    return (
                      <li className="" 
                        key={"course" + section}
                        style={{"padding":'6px 1px 6px 5px','width': '90%',color:'orange'}}>
                        <FontAwesomeIcon icon={faDotCircle}/>
                        <span>{section}</span>
                    </li>
                    )
                  })
                  }
                </ul>
              </div>
    </Accordion>
    );
  }
}