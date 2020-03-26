import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const LayoutContainer = styled.div`
    display: flex;
    min-height: 100vh; 
    padding:0px;
    margin:0px;
`;

const Panel = styled.div`
    background: #e4eaed;
    width: ${props => props.width};
`;

const Resizer = styled.div`
    border:3px solid gray;
    background-color: gray;
    position: relative;
    cursor: col-resize;
    flex-shrink: 0;
    -webkit-user-select: none;  
    -moz-user-select: none;     
    -ms-user-select: none;      
    user-select: none;

   
`;

export default class ToolPanelsTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        isDragging: false,
        panels: [200, 600, 400],
        deviceGivenWidth: this.widthToDevice(),
    }
    this.stopResize = this.stopResize.bind(this);
    this.startResize = this.startResize.bind(this);
    this.resizePanel = this.resizePanel.bind(this);
    this.windowResizeHandler = this.windowResizeHandler.bind(this);
}

windowResizeHandler() {
    let deviceGivenWidth = this.widthToDevice();
    if (this.state.deviceGivenWidth !== deviceGivenWidth) {
        this.setState({ deviceGivenWidth: deviceGivenWidth });
    }
    if (this.state.deviceGivenWidth === 'tablet') {
        this.setState({ panels: [150, 600, 300] });
    }
    if (this.state.deviceGivenWidth === 'computer') {
        this.setState({ panels: [200, 600, 400] });
    }
}

widthToDevice() {
    let w = document.documentElement.clientWidth;
    if (w >= 1024) { return "computer"; }
    if (w < 1024 && w >= 768) { return "tablet"; }
    return "phone";
}

componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('mousemove', this.resizePanel)
    ReactDOM.findDOMNode(this).addEventListener('mouseup', this.stopResize)
    ReactDOM.findDOMNode(this).addEventListener('mouseleave', this.stopResize)
    window.addEventListener("resize", this.windowResizeHandler);
    if (this.state.deviceGivenWidth === 'computer') {
        this.setState({ panels: [200, 600, 400] });
    }
    if (this.state.deviceGivenWidth === 'tablet') {
        this.setState({ panels: [150, 600, 300] });
    }
}

// startResize(event, index) {
//     this.setState({
//         isDragging: true,
//         currentPanel: index,
//         initialPos: event.clientX
//     })
// }

// stopResize() {
//     if (this.state.isDragging) {
//         this.setState(({ panels, currentPanel, delta }) => ({
//             isDragging: false,
//             delta: 0,
//             currentPanel: null
//         }))
//     }
// }

// resizePanel(event) {
//     if (this.state.isDragging) {
//         const newDelta = event.clientX - this.state.initialPos;
//         const newPanleValues = {
//             ...this.state.panels,
//             [this.state.currentPanel]: this.state.panels[this.state.currentPanel] - newDelta,
//             [this.state.currentPanel - 1]: this.state.panels[this.state.currentPanel - 1] + newDelta,
//         }
//         const clientX = event.clientX;
//         console.log('newPanleValues', newPanleValues);
//         console.log('clientX', event.clientX);
//         if (newPanleValues[0] <= 70 && clientX <= 119) {
//             return false;
//         }

//         // currentPanel === 1


//         // if (newPanleValues[0] <= 70 || newPanleValues[0] >= 100) {
//         //     newPanleValues[0] = this.state.panels[0];
//         // }

//         this.setState(({ panels, currentPanel }) => ({
//             // panels: {
//             //     ...panels,
//             //     [currentPanel]: (panels[currentPanel] || 0) - newDelta,
//             //     [currentPanel - 1]: (panels[currentPanel - 1] || 0) + newDelta
//             // },
//             delta: newDelta,
//             panels: newPanleValues

//         }));

//         //            event.target.style.top = event.clientY + "px";

//     }

// }


startResize(event, index) {
  this.setState({
      isDragging: true,
      currentPanel: index,
      initialPos: event.clientX
  })
}

stopResize() {
  if (this.state.isDragging) {
      this.setState(({ panels, currentPanel, delta }) => ({
          isDragging: false,
          delta: 0,
          currentPanel: null
      }))
  }
}

resizePanel(event) {
  if (this.state.isDragging) {
      const newDelta = event.clientX - this.state.initialPos;
      this.setState(({ panels, currentPanel }) => ({
          panels: {
              ...panels,
              [currentPanel]: (panels[currentPanel] || 0) - newDelta,
              [currentPanel - 1]: (panels[currentPanel - 1] || 0) + newDelta
          },
          delta: newDelta

      }))
  }
}

render() {
    const rest = this.props.children.slice(1);
    return (
        <LayoutContainer onMouseUp={() => this.stopResize()}>
            <Panel width={this.state.panels[0] + 'px'}>
                {this.props.children[0]}
            </Panel>
            {[].concat(...rest.map((child, i) => {
                return [
                    <Resizer onMouseDown={(e) => this.startResize(e, i + 1)}
                        key={"resizer_" + i}
                        style={this.state.currentPanel === i + 1 ? { left: this.state.delta } : {}}
                    ></Resizer>,
                    <Panel
                        key={"panel_" + i}
                        width={i === 0 ? `calc(100% - ${this.state.panels[0]}px - ${this.state.panels[2]}px)` : this.state.panels[i + 1] + 'px'}>
                        {child}
                    </Panel>
                ]
            }))}
        </LayoutContainer>
    )
}
}
