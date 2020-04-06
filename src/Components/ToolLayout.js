import React, { Component } from "react";
import ToolLayoutTest from './ToolLayoutTest';
import PhoneLayoutTest from './PhoneLayoutTest';


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
      return <ToolLayoutTest deviceType="computer"/>

    } else if (this.state.deviceGivenWidth === "tablet") {
      return <ToolLayoutTest deviceType="tablet" />

    } else {
      //phone
      return <PhoneLayoutTest />
    }
  }
}

export default ToolLayout;
