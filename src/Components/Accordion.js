import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default class Accordion extends Component {

  constructor(props) {
    super(props);
    const openSections = {};
    this.state = { openSections };
    this.onClick = label => {
      const {
        state: { openSections },
      } = this;
  
      const isOpen = !!openSections[label];
  
      this.setState({
        openSections: {
          [label]: !isOpen
        }
      });
    };
  }

  render() {
    const {
      onClick,
      props: { children },
      state: { openSections },
    } = this;

    return (
        <AccordionSection
          isOpen={!!openSections[children.props.label]}
          label={children.props.label}
          onClick={onClick}>
          {children.props.children}
        </AccordionSection>
    );
  }
}

class AccordionSection extends Component {
  constructor(props) {
    super(props);
  this.onClick = () => {
    this.props.onClick(this.props.label);
  };
}

  render() {
    const {
      onClick,
      props: { isOpen, label },
    } = this;

    return (
      <div style={{ "width":"100%","height":"100%", "cursor":'pointer'}}>
        <div onClick={onClick} data-cy="coursesAccordion"> 
          {isOpen? <FontAwesomeIcon  icon={faCaretDown}/> :
          <FontAwesomeIcon icon={faCaretRight}/>}
          {label}
        </div>
        {isOpen && (
          <div>
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}