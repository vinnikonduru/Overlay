
import React, { Component } from "react";
import ToolLayoutPanels from './ToolLayoutPanels';
import PhoneLayout from './PhoneLayout';


class ToolLayout extends Component {
  constructor() {
    super();
    this.state = {
     
      deviceGivenWidth: this.widthToDevice()
    };
    this.windowResizerHandler = this.windowResizerHandler.bind(this);
  }

  windowResizerHandler() {
    let deviceGivenWidth = this.widthToDevice();
    if (this.state.deviceGivenWidth != deviceGivenWidth) {
      this.setState({ deviceGivenWidth: deviceGivenWidth });
    }
  }

  widthToDevice() {
    let w = document.documentElement.clientWidth;
    if (w >= 1024) {
      return "computer";
    }
    if (w < 1024 && w >= 768) {
      return "tablet";
    }
    return "phone";
  }
  componentDidMount() {
    window.addEventListener("resize", this.windowResizerHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.windowResizeHandler);
  }

  render() {
    if (this.state.deviceGivenWidth === "computer") {
      return <ToolLayoutPanels deviceType="computer"/>

    } else if (this.state.deviceGivenWidth === "tablet") {
      return <ToolLayoutPanels deviceType="tablet" />

    } else {
      //phone
      return <PhoneLayout />
    }
  }
}

export default ToolLayout;
